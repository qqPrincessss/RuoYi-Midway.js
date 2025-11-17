import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { GenTable } from '@module/tool/entites/GenTable';
import { ListGenTableDTO, CreateGenTableDTO, UpdateGenTableDTO, GenDbTableList } from '@dto/tool/genTable.dto';
import { resBuild } from '@utils/resBuild';
import { checkIfExsit } from '@utils/serviceHelp';
import { capitalize, getColumnLength, getOperator } from '@utils';
import { formatDate } from '@utils/time';
import toolConfig from '@utils/config';
import { toPascalCase, arraysContains } from '@utils/index';
import { camelCase, toLower } from 'lodash';
import { index as templateIndex } from '@module/tool/template/index';


import { GenTableColumn } from '@module/tool/entites/GenTableColumn';
import { GenConstants } from '@utils/gen.constant';
import * as fs from 'fs-extra';
import * as path from 'path';
import archiver from 'archiver';


@Provide()
export class GenTableDao {
  @Inject()
  ctx: Context;

  @InjectEntityModel(GenTable)
  genTableRepo: Repository<GenTable>;
  @InjectEntityModel(GenTableColumn)
  genTableColumnRepo: Repository<GenTableColumn>;



  // 列表
  async list(queryParams: ListGenTableDTO) {
    const queryBuilder = this.genTableRepo.createQueryBuilder('entity');
    if (queryParams.tableName) {
      queryBuilder.andWhere('entity.tableName LIKE :tableName', { tableName: `%${queryParams.tableName}%` });
    }
    if (queryParams.tableComment) {
      queryBuilder.andWhere('entity.tableComment LIKE :tableComment', { tableComment: `%${queryParams.tableComment}%` });
    }
    // 时间范围，包含全天
    if (queryParams['params[beginTime]'] && queryParams['params[endTime]']) {
      queryBuilder.andWhere('entity.createTime BETWEEN :beginTime AND :endTime', {
        beginTime: `${queryParams['params[beginTime]']} 00:00:00`,
        endTime: `${queryParams['params[endTime]']} 23:59:59`,
      });
    }

    if (queryParams.pageNum && queryParams.pageSize) {
      queryBuilder.skip((queryParams.pageNum - 1) * queryParams.pageSize).take(queryParams.pageSize);
    }

    const [rows, total] = await queryBuilder.getManyAndCount();
    return resBuild.list(rows, total);
  }
  async genDbList(query: GenDbTableList) {
    const params: any[] = [];
    let where = `
      n.nspname = 'public'
      AND c.relkind = 'r'  -- 仅基础表
      AND c.relname NOT LIKE 'qrtz_%'
      AND c.relname NOT LIKE 'gen_%'
      AND c.relname NOT IN (SELECT gt.table_name FROM public.gen_table gt)
    `;

    if (query.tableName) {
      params.push(`%${query.tableName}%`);
      where += ` AND c.relname ILIKE $${params.length}`;
    }
    if (query.tableComment) {
      params.push(`%${query.tableComment}%`);
      where += ` AND COALESCE(d.description, '') ILIKE $${params.length}`;
    }

    const countSql = `
      SELECT COUNT(*) AS total
      FROM pg_catalog.pg_class c
      JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
      LEFT JOIN pg_catalog.pg_description d ON d.objoid = c.oid AND d.objsubid = 0
      WHERE ${where}
    `;
    const countRes = await this.genTableRepo.query(countSql, params);
    const total = Number(countRes[0]?.total ?? 0);

    // 将分页参数转为数字并内联，避免占位符在 LIMIT/OFFSET 中失效
    const pageSize = Number(query.pageSize) || 10;
    const pageNum = Number(query.pageNum) || 1;
    const offset = Math.max(0, (pageNum - 1) * pageSize);
    const paginationClause = ` LIMIT ${pageSize} OFFSET ${offset} `;

    const listSql = `
      SELECT
        c.relname AS "tableName",
        COALESCE(d.description, '') AS "tableComment",
        NULL::timestamp AS "createTime",
        NULL::timestamp AS "updateTime"
      FROM pg_catalog.pg_class c
      JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
      LEFT JOIN pg_catalog.pg_description d ON d.objoid = c.oid AND d.objsubid = 0
      WHERE ${where}
      ORDER BY c.relname ASC
      ${paginationClause}
    `;
    const rows = await this.genTableRepo.query(listSql, params);

    const mapped = rows.map((v: any) => ({
      ...v,
      createTime: formatDate(v.createTime),
      updateTime: formatDate(v.updateTime),
    }));

    return resBuild.list(mapped, total);
  }
  // 导入表
  async importTable(tableList: GenTable[]) {
    for (const table of tableList) {
      const tableName = table.tableName;
      const tableData: any = {
        tableName: tableName,
        tableComment: table.tableComment?.trim() || table.tableName,
        className: toolConfig.autoRemovePre ? toPascalCase(tableName.replace(new RegExp(toolConfig.tablePrefix.join('|')), '')) : toPascalCase(tableName),
        packageName: toolConfig.packageName,
        moduleName: toolConfig.moduleName,
        businessName: toolConfig.autoRemovePre ? camelCase(tableName.replace(new RegExp(toolConfig.tablePrefix.join('|')), '')) : camelCase(tableName), // 生成业务名：下划线转小驼峰
        functionName: table.tableComment?.trim() || table.tableName, //生成功能名
        functionAuthor: toolConfig.author,
        createBy: getOperator(this.ctx),
        createTime: new Date(),
      };
      const tableInfo = await this.genTableRepo.save(tableData);
      const tableColumn: any = await this.getTableColumnInfo(tableName);
      for (const c of tableColumn) {
        const entity = this.initTableColumn(c, tableInfo);
        entity.sort = Number(entity.sort);
        await this.genTableColumnRepo.save(entity);
      }
    }
    return resBuild.success();
  }
  // 添加
  async create(genTable: CreateGenTableDTO) {
    if (genTable.tableName) {
      await checkIfExsit(this.genTableRepo, 'tableName', genTable.tableName);
    }
    const myEntity = this.genTableRepo.create(genTable);
    myEntity.setCreateBy(getOperator(this.ctx));
    await this.genTableRepo.save(myEntity);
    return resBuild.success();
  }

  // 删除
  async delete(tableId: string) {
    const ids = tableId.split(',').map(id => Number(id));
    await this.genTableRepo.delete(ids);
    return resBuild.success();
  }

  // 修改
  async update(genTable: UpdateGenTableDTO) {
    for (const item of genTable.columns) {
      if (item.columnId) {
        await this.genTableColumnRepo.update({ columnId: item.columnId }, item);
      }
    }
    delete genTable.columns;
    const myEntity = this.genTableRepo.create(genTable);
    myEntity.setUpdateBy(getOperator(this.ctx));
    await this.genTableRepo.save(myEntity);
    return resBuild.success();
  }

  // 详情
  async detail(tableId: number) {
    const detailInfo = await this.genTableRepo.findOneBy({
      tableId,
    });
    const columns = await this.genTableColumnRepo.findBy({
      tableId,
    });
    return resBuild.data({ info: { ...detailInfo, columns } });
  }
  // 同步数据库表结构
  async synchDb(tableName: string) {
    const table = await this.findOneByTableName(tableName);
    if (!table) throw new Error('同步数据失败，原表结构不存在！');
    //已在数据库中的表列信息
    const tableColumns = table.columns;
    //更改后的数据库表的列信息
    const columns: any = await this.getTableColumnInfo(tableName);
    if (!columns || !columns?.length) throw new Error('同步数据失败，新表结构不存在！');
    //存储之前就存在已生成的列信息
    const tableColumnMap = {};
    for (const v of tableColumns) {
      tableColumnMap[v.columnName] = v;
    }
    //更新或插入列
    for (const column of columns) {
      //初始化column的值
      this.initTableColumn(column, table);
      //如果之前存储过，更新
      if (tableColumnMap[column.columnName]) {
        //之前存储的列
        const prevColumn = tableColumnMap[column.columnName];
        column.columnId = prevColumn.columnId;
        column.sort = Number(column.sort);
        if (column.isList === '1') {
          // 如果是列表，继续保留查询方式/字典类型选项
          column.dictType = prevColumn.dictType;
          column.queryType = prevColumn.queryType;
        }
        await this.genTableColumnRepo.update({ columnId: column.columnId }, column);
      }
      //插入
      else {
        column.sort = Number(column);
        await this.genTableColumnRepo.save(column);
      }
    }
    //删除已经不存在表中数据
    if (tableColumns.length > 0) {
      const delColumns = tableColumns.filter((v) => !columns.some((z) => z.columnName === v.columnName)).map((v) => v.columnId);
      if (delColumns.length > 0) {
        await this.genTableColumnRepo.delete(delColumns);
      }
    }
    return resBuild.success();
  }
  async preview(id: number) {
    const data = await this.genTableRepo.findOne({ where: { tableId: id, delFlag: '0' } });
    const columns = await this.genTableColumnRepo.find({ where: { tableId: id, delFlag: '0' } });
    const primaryKey = await this.getPrimaryKey(columns);
    console.log(primaryKey, data.businessName, capitalize(data.businessName));
    const info = { primaryKey, BusinessName: capitalize(data.businessName), ...data, columns };
    return resBuild.data(templateIndex(info));
  }
  /**
 *
 * 查询主键id
 */
  async getPrimaryKey(columns) {
    for (const column of columns) {
      if (column.isPk === '1') {
        return column.javaField;
      }
    }
    return null;
  }
  async batchGenCode(tables: string) {
    const zipFilePath = path.posix.join(__dirname, 'temp.zip');
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    // 使用 Promise 确保在写入完成后返回 Buffer
    const resultPromise = new Promise<Buffer>((resolve, reject) => {
      output.on('close', async () => {
        try {
          this.ctx.set('Content-Type', 'application/zip');
          this.ctx.set('Content-Disposition', 'attachment; filename=download.zip');
          const buf = await fs.readFile(zipFilePath);
          await fs.remove(zipFilePath);
          resolve(buf);
        } catch (err) {
          reject(err);
        }
      });

      archive.on('error', (err) => {
        reject(err);
      });
    });

    const tableNamesList = tables.split(',');
    const tableList = await Promise.all(
      tableNamesList.map(async (item) => {
        const data = await this.genTableRepo.findOne({ where: { tableName: item, delFlag: '0' } });
        const columns = await this.genTableColumnRepo.find({ where: { tableId: data.tableId, delFlag: '0' } });
        const primaryKey = await this.getPrimaryKey(columns);
        console.log(primaryKey, data.businessName, capitalize(data.businessName), columns);
        return { primaryKey, BusinessName: capitalize(data.businessName), ...data, columns };
      }),
    );

    archive.pipe(output);
    for (const item of tableList) {
      const list = templateIndex(item);
      const templates = [
        { content: list['tool/template/midwayjs/entity.ts.vm'], path: `midwayjs/${item.BusinessName}/entities/${item.businessName}.entity.ts` },
        { content: list['tool/template/midwayjs/dto.ts.vm'], path: `midwayjs/${item.BusinessName}/dto/${item.businessName}.dto.ts` },
        { content: list['tool/template/midwayjs/controller.ts.vm'], path: `midwayjs/${item.BusinessName}/${item.businessName}.controller.ts` },
        { content: list['tool/template/midwayjs/service.ts.vm'], path: `midwayjs/${item.BusinessName}/${item.businessName}.service.ts` },
        { content: list['tool/template/midwayjs/dao.ts.vm'], path: `midwayjs/${item.BusinessName}/${item.businessName}.dao.ts` },
        { content: list['tool/template/vue/api.js.vm'], path: `vue/${item.BusinessName}/${item.businessName}.js` },
        { content: list['tool/template/vue/index.vue.vm'], path: `vue/${item.BusinessName}/${item.businessName}/index.vue` },
        { content: list['tool/template/vue/dialogVue.vue.vm'], path: `vue/${item.BusinessName}/${item.businessName}/components/indexDialog.vue` },
        { content: list['tool/template/pg/pg.sql.vm'], path: `pg/${item.BusinessName}/${item.businessName}.sql` },
      ];

      for (const template of templates) {
        if (!template.content) throw new Error('One or more templates are undefined');
        archive.append(Buffer.from(template.content), { name: template.path });
      }
    }

    await archive.finalize();
    return resultPromise;
  }
  /**
 * 根据表名批量获取表的基本信息（包含注释）
 * @param tableNames
 * @returns
 */
  async selectDbTableListByNames(tableNames: string[]) {
    if (!tableNames.length) return [];
    const sql = `
      SELECT
        c.relname AS "tableName",
        COALESCE(d.description, '') AS "tableComment",
        NULL::timestamp AS "createTime",
        NULL::timestamp AS "updateTime"
      FROM pg_catalog.pg_class c
      JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
      LEFT JOIN pg_catalog.pg_description d ON d.objoid = c.oid AND d.objsubid = 0
      WHERE
        n.nspname = 'public'
        AND c.relkind = 'r'
        AND c.relname NOT LIKE 'qrtz_%'
        AND c.relname NOT LIKE 'gen_%'
        AND c.relname NOT IN (SELECT gt.table_name FROM public.gen_table gt)
        AND c.relname = ANY($1::text[])
      ORDER BY c.relname ASC
    `;
    return this.genTableRepo.query(sql, [tableNames]);
  }
  /**
   * 根据表名获取表的字段信息以及注释
   * @param tableName
   * @returns
   */
  async getTableColumnInfo(tableName: string) {
    if (!tableName) return null;
    const sql = `
      SELECT
        cols.column_name AS "columnName",
        CASE WHEN cols.is_nullable = 'NO' AND pk.column_name IS NULL THEN '1' ELSE '0' END AS "isRequired",
        CASE WHEN pk.column_name IS NOT NULL THEN '1' ELSE '0' END AS "isPk",
        cols.ordinal_position AS "sort",
        COALESCE(col_description(cl.oid, att.attnum), '') AS "columnComment",
        cols.column_default AS "columnDefault",
        CASE
          WHEN cols.is_identity = 'YES' OR cols.column_default LIKE 'nextval(%' THEN '1'
          ELSE '0'
        END AS "isIncrement",
        TRIM(SPLIT_PART(format_type(att.atttypid, att.atttypmod), '(', 1)) AS "columnType"
      FROM information_schema.columns cols
      JOIN pg_class cl ON cl.relname = $1
      JOIN pg_namespace n ON n.oid = cl.relnamespace AND n.nspname = 'public'
      JOIN pg_attribute att ON att.attrelid = cl.oid AND att.attname = cols.column_name
      LEFT JOIN (
        SELECT kcu.column_name
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name
         AND tc.table_schema = kcu.table_schema
         AND tc.table_name = kcu.table_name
        WHERE tc.table_schema = 'public'
          AND tc.table_name = $1
          AND tc.constraint_type = 'PRIMARY KEY'
      ) pk ON pk.column_name = cols.column_name
      WHERE cols.table_schema = 'public' AND cols.table_name = $1
      ORDER BY cols.ordinal_position
    `;
    return this.genTableRepo.query(sql, [tableName]);
  }
  /**
     * 初始化表列的字段信息
     * @param column
     * @param table
     */
  initTableColumn(column: any, table: any): GenTableColumn {
    const columnName = column.columnName;
    const dataType = column.columnType;
    const entity = this.genTableColumnRepo.create(column as Partial<GenTableColumn>);
    entity.tableId = table.tableId;
    entity.javaField = camelCase(columnName);
    entity.javaType = GenConstants.TYPE_STRING;
    entity.queryType = GenConstants.QUERY_EQ;
    entity.columnComment = entity.columnComment || entity.columnName;
    entity.setCreateBy(getOperator(this.ctx));
    entity.setUpdateBy(getOperator(this.ctx));
    if (arraysContains(GenConstants.COLUMNTYPE_TEXT, dataType)) {
      entity.htmlType = GenConstants.HTML_TEXTAREA;
    } else if (arraysContains(GenConstants.COLUMNTYPE_STR, dataType)) {
      const len = getColumnLength(dataType);
      entity.htmlType = len >= 500 ? GenConstants.HTML_TEXTAREA : GenConstants.HTML_INPUT;
    } else if (arraysContains(GenConstants.COLUMNTYPE_TIME, dataType)) {
      entity.javaType = GenConstants.TYPE_DATE;
      entity.htmlType = GenConstants.HTML_DATETIME;
    } else if (arraysContains(GenConstants.COLUMNTYPE_NUMBER, dataType)) {
      entity.htmlType = GenConstants.HTML_INPUT;
      entity.javaType = GenConstants.TYPE_NUMBER;
    }
    entity.isRequired = GenConstants.NOT_REQUIRE;

    // 插入字段
    if (!arraysContains(GenConstants.COLUMNNAME_NOT_INSERT, columnName)) {
      entity.isInsert = GenConstants.REQUIRE;
    }
    // 编辑字段
    if (!arraysContains(GenConstants.COLUMNNAME_NOT_EDIT, columnName)) {
      entity.isEdit = GenConstants.REQUIRE;
    }
    // 列表字段
    if (!arraysContains(GenConstants.COLUMNNAME_NOT_LIST, columnName)) {
      entity.isList = GenConstants.REQUIRE;
    }
    // 查询字段
    if (!arraysContains(GenConstants.COLUMNNAME_NOT_QUERY, columnName) && entity.htmlType != GenConstants.HTML_TEXTAREA) {
      entity.isQuery = GenConstants.REQUIRE;
    }

    // 主键字段
    if (entity.isPk == '1') {
      entity.isInsert = GenConstants.NOT_REQUIRE;
      entity.isEdit = GenConstants.REQUIRE;
      entity.isQuery = GenConstants.REQUIRE;
      entity.isList = GenConstants.REQUIRE;
      entity.isRequired = GenConstants.REQUIRE;
    }

    const lowerColumnName = toLower(columnName);
    // 查询字段类型
    if (lowerColumnName.includes('name')) {
      column.queryType = GenConstants.QUERY_LIKE;
    }
    // 状态字段设置单选框
    if (lowerColumnName.includes('status')) {
      column.htmlType = GenConstants.HTML_RADIO;
    }
    // 类型&性别字段设置下拉框
    else if (lowerColumnName.includes('type') || lowerColumnName.includes('sex')) {
      column.htmlType = GenConstants.HTML_SELECT;
    }
    //日期字段设置日期控件
    else if (lowerColumnName.includes('time') || lowerColumnName.includes('_date') || lowerColumnName.includes('Date')) {
      column.htmlType = GenConstants.HTML_DATETIME;
      column.queryType = GenConstants.QUERY_BETWEEN;
    }
    // 图片字段设置图片上传控件
    else if (lowerColumnName.includes('image')) {
      column.htmlType = GenConstants.HTML_IMAGE_UPLOAD;
    }
    // 文件字段设置文件上传控件
    else if (lowerColumnName.includes('file')) {
      column.htmlType = GenConstants.HTML_FILE_UPLOAD;
    }
    // 内容字段设置富文本控件
    else if (lowerColumnName.includes('content')) {
      column.htmlType = GenConstants.HTML_EDITOR;
    }
    return entity;
  }
  /**
 * 根据表名查询表详细信息
 * @param tableName
 * @returns
 */
  async findOneByTableName(tableName: string) {
    const data = await this.genTableRepo.findOne({ where: { tableName: tableName, delFlag: '0' } });
    const columns = await this.genTableColumnRepo.find({ where: { tableId: data.tableId, delFlag: '0' } });
    return { ...data, columns };
  }
}
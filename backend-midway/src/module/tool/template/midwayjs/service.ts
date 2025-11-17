import * as Lodash from 'lodash';

/**
 * 根据 Query DTO 字段生成导出表头
 * @param options 
 * @returns 
 */
const generateExportHeaders = (options) => {
  const { columns } = options;
  return columns
    .filter((column) => column.isList === '1') // 只包含列表显示的字段
    .map((column) => {
      const { javaField, columnComment } = column;
      // 使用字段注释作为 label，如果没有注释则使用字段名
      const label = columnComment || javaField;
      return `      { label: '${label}', prop: '${javaField}' }`;
    })
    .join(',\n');
};

export const serviceTem = (options) => {
  const { BusinessName, businessName,primaryKey  } = options;
   const daoName = `${Lodash.upperFirst(BusinessName)}Dao`;
  const daoInstance = `${businessName}Dao`;
  return `
import { Provide, Inject } from '@midwayjs/core';
import { ${daoName} } from '@dao/${businessName}.dao';
import { Create${Lodash.upperFirst(BusinessName)}Dto, Update${Lodash.upperFirst(BusinessName)}Dto, Query${Lodash.upperFirst(BusinessName)}Dto } from '@dto/${businessName}.dto';
import { DownloadExcelService } from '../service/common/downloadExcel';
@Provide()
export class ${Lodash.upperFirst(BusinessName)}Service {
  @Inject()
  ${daoInstance}: ${daoName};
  @Inject()
  downloadExcelService: DownloadExcelService;
   // 创建
  async create(body: Create${Lodash.upperFirst(BusinessName)}Dto) {
    return await this.${daoInstance}.create(body);
  }
  // 获取列表
  async list(query: Query${Lodash.upperFirst(BusinessName)}Dto) {
    return await this.${daoInstance}.list(query);
  }
  // 获取详情
  async detail(${primaryKey}: string) {
    return await this.${daoInstance}.detail(+${primaryKey});
  }
  // 修改
  async update( body: Update${Lodash.upperFirst(BusinessName)}Dto) {
    return await this.${daoInstance}.update(body);
  }
  // 删除
  async remove(${primaryKey}s: Array<number>) {
    return await this.${daoInstance}.remove(${primaryKey}s);
  }
  // 导出
  async export(queryParams: Query${Lodash.upperFirst(BusinessName)}Dto) {  
    const headers = [
${generateExportHeaders(options)}
    ];
    const { rows } = (await this.${daoInstance}.list(queryParams)).data;
    return this.downloadExcelService.downloadExcel({
      headers,
      data: rows,
      sheetName: '${Lodash.upperFirst(BusinessName)}信息',
    });
  }
}`;
};
import { CommonEntity } from "@module/common/entity/common.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


// 参数配置表 -  实体类
@Entity('gen_table', { comment: '代码生成' })
export class GenTable extends CommonEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'table_id', comment: '编号' })
  tableId: number;

  @Column({ type: 'varchar', name: 'table_name', length: 100, default: '', comment: '表名称' })
  tableName: string;

  @Column({ type: 'varchar', name: 'table_comment', length: 500, default: '', comment: '表描述' })
  tableComment: string;

  @Column({ type: 'varchar', name: 'sub_table_name', length: 64, default: null, comment: '关联子表的表名' })
  subTableName: string;

  @Column({ type: 'varchar', name: 'sub_table_fk_name', length: 64, default: null, comment: '子表关联的外键名' })
  subTableFkName: string;

  @Column({ type: 'varchar', name: 'class_name', length: 100, default: '', comment: '实体类名称' })
  className: string;

  @Column({ type: 'varchar', name: 'tpl_category', length: 200, default: 'crud', comment: '使用的模板（crud单表操作 tree树表操作）' })
  tplCategory: string;

  @Column({ type: 'varchar', name: 'tpl_web_type', length: 30, default: '', comment: '前端模板类型（element-ui模版 element-plus模版）' })
  tplWebType: string;

  @Column({ type: 'varchar', name: 'package_name', length: 100, comment: '生成包路径' })
  packageName: string;

  @Column({ type: 'varchar', name: 'module_name', length: 30, comment: '生成模块名' })
  moduleName: string;

  @Column({ type: 'varchar', name: 'business_name', length: 30, comment: '生成业务名' })
  businessName: string;

  @Column({ type: 'varchar', name: 'function_name', length: 50, comment: '生成功能名' })
  functionName: string;

  @Column({ type: 'varchar', name: 'function_author', length: 50, comment: '生成功能作者' })
  functionAuthor: string;

  @Column({ type: 'varchar', name: 'gen_type', length: 1, default: '0', comment: '生成代码方式（0zip压缩包 1自定义路径）' })
  genType: string;

  @Column({ type: 'varchar', name: 'gen_path', length: 200, default: '/', comment: '生成路径（不填默认项目路径）' })
  genPath: string;

  @Column({ type: 'varchar', name: 'options', length: 1000, comment: '其它生成选项' })
  options: string;

  @Column({ type: 'varchar', name: 'remark', default: null, length: 500, comment: '备注', })
  remark: string;
  @Column({ type: 'char', name: 'status', length: 1, default: '0', comment: '状态（0正常 1停用）' })
  status: string;
}

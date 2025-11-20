import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CommonEntity } from "@module/common/entity/common.entity";

// 代码生成字段表 - 实体类
@Entity('gen_table_column', { comment: '代码生成字段' })
export class GenTableColumn extends CommonEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'column_id', comment: '编号' })
  columnId: number;

  @Column({ type: 'bigint', name: 'table_id', nullable: true, comment: '归属表编号' })
  tableId: number;

  @Column({ type: 'varchar', name: 'column_name', length: 200, default: '', comment: '列名称' })
  columnName: string;

  @Column({ type: 'varchar', name: 'column_comment', length: 500, default: '', comment: '列描述' })
  columnComment: string;

  @Column({ type: 'varchar', name: 'column_type', length: 100, default: '', comment: '列类型' })
  columnType: string;

  @Column({ type: 'varchar', name: 'java_type', length: 500, default: '', comment: 'JAVA类型' })
  javaType: string;

  @Column({ type: 'varchar', name: 'java_field', length: 200, default: '', comment: 'JAVA字段名' })
  javaField: string;

  @Column({ type: 'char', name: 'is_pk', length: 1, default: '', comment: '是否主键（1是）' })
  isPk: string;

  @Column({ type: 'char', name: 'is_increment', length: 1, default: '', comment: '是否自增长（1是）' })
  isIncrement: string;

  @Column({ type: 'char', name: 'is_required', length: 1, default: '', comment: '是否必填（1是）' })
  isRequired: string;

  @Column({ type: 'char', name: 'is_insert', length: 1, default: '', comment: '是否为插入字段（1是）' })
  isInsert: string;

  @Column({ type: 'char', name: 'is_edit', length: 1, default: '', comment: '是否编辑字段（1是）' })
  isEdit: string;

  @Column({ type: 'char', name: 'is_list', length: 1, default: '', comment: '是否列表字段（1是）' })
  isList: string;

  @Column({ type: 'char', name: 'is_query', length: 1, default: '', comment: '是否查询字段（1是）' })
  isQuery: string;

  @Column({ type: 'varchar', name: 'query_type', length: 200, default: 'EQ', comment: '查询方式（等于、不等于、大于、小于、范围）' })
  queryType: string;

  @Column({ type: 'varchar', name: 'html_type', length: 200, default: '', comment: '显示类型（文本框、文本域、下拉框、复选框、单选框、控件）' })
  htmlType: string;

  @Column({ type: 'varchar', name: 'dict_type', length: 200, default: '', comment: '字典类型' })
  dictType: string;

  @Column({ type: 'bigint', name: 'sort', comment: '排序' })
  sort: number;

  @Column({ type: 'varchar', name: 'column_default', length: 255, default: null, comment: '默认值' })
  columnDefault: string;

  @Column({ type: 'char', name: 'status', length: 1, default: '0', comment: '状态（0正常 1停用）' })
  status: string;


  @Column({ type: 'varchar', name: 'remark', default: null, length: 255, comment: '备注' })
  remark: string;
}

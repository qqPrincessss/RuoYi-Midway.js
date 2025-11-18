import { CommonEntity } from "../../../common/entity/common.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// 字典数据表 -  实体类
@Entity('sys_dict_data', { comment: '字典数据表' })
export class SysDictData extends CommonEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'dict_code', comment: '字典编码' })
  dictCode: number;

  @Column({ type: 'integer', name: 'dict_sort', default: 0, comment: '字典排序' })
  dictSort: number;

  @Column({ type: 'varchar', name: 'dict_label', default: '', comment: '字典标签' })
  dictLabel: string;

  @Column({ type: 'varchar', name: 'dict_value', default: '', comment: '字典键值' })
  dictValue: string;

  @Column({ type: 'varchar', name: 'dict_type', default: '', comment: '字典类型' })
  dictType: string;

  @Column({ type: 'varchar', name: 'css_class', default: null, comment: '样式属性（其他样式扩展）' })
  cssClass: string;

  @Column({ type: 'varchar', name: 'list_class', default: null, comment: '表格回显样式' })
  listClass: string;

  @Column({ type: 'char', name: 'is_default', default: 'N', comment: '是否默认（Y是 N否）' })
  isDefault: string;

  @Column({ type: 'char', name: 'status', default: '0', comment: '状态（0正常 1停用）' })
  status: string;

  @Column({ type: 'varchar', name: 'remark', default: null, comment: '备注', length: 500 })
  remark: string;
}

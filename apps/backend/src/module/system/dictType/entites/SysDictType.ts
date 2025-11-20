import { CommonEntity } from "@module/common/entity/common.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// 字典类型表 -  实体类
@Entity('sys_dict_type', { comment: '字典类型表' })
export class SysDictType extends CommonEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'dict_id', comment: '字典主键' })
  dictId: number;

  @Column({ type: 'varchar', name: 'dict_name', length: 100, default: '', comment: '字典名称' })
  dictName: string;

  @Column({ type: 'varchar', name: 'dict_type', length: 100, default: '', comment: '字典类型', unique: true })
  dictType: string;

  @Column({ type: 'char', name: 'status', length: 1, default: '0', comment: '状态（0正常 1停用）' })
  status: string;

  @Column({ type: 'varchar', name: 'remark', default: null, comment: '备注', length: 500 })
  remark: string;
}

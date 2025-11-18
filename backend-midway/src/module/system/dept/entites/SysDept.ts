import { CommonEntity } from "../../../common/entity/common.entity";
import { Column, Entity,  PrimaryGeneratedColumn } from "typeorm";
// 部门表-实体类
@Entity('sys_dept', { comment: '部门表' })
export class SysDept extends CommonEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'dept_id', comment: '部门ID' })
  deptId: number;

  @Column({ type: 'int', name: 'parent_id', default: 0, comment: '父部门ID' })
  parentId: number;

  @Column({ type: 'varchar', name: 'ancestors', default: '', comment: '祖级列表' })
  ancestors: string;

  @Column({ type: 'varchar', name: 'dept_name', default: '', comment: '部门名称' })
  deptName: string;

  @Column({ type: 'bigint', name: 'order_num', default: 0, comment: '显示顺序' })
  orderNum: number;

  @Column({ type: 'varchar', name: 'leader', default: '', comment: '负责人' })
  leader: string;

  @Column({ type: 'varchar', name: 'phone', default: '', comment: '联系电话' })
  phone: string;

  @Column({ type: 'varchar', name: 'email', default: '', comment: '邮箱' })
  email: string;

  @Column({ type: 'varchar', name: 'status', default: '0', comment: '部门状态（0正常 1停用）' })
  status: string;

  @Column({ type: 'varchar', name: 'del_flag', default: '0', comment: '删除标志（0代表存在 2代表删除）' })
  delFlag: string;
}

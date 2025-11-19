import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { SysUser } from "../../user/entites/SysUser";
import { CommonEntity } from "@module/common/entity/common.entity";
import { SysMenu } from "../../menu/entites/SysMenu";

// 角色表-实体类
@Entity('sys_role', { comment: '角色信息表' })
export class SysRole extends CommonEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'role_id', comment: '角色ID' })
  roleId: number;

  @Column({ type: 'varchar', name: 'role_name', comment: '角色名称' })
  roleName: string;

  @Column({ type: 'varchar', name: 'role_key', comment: '角色权限字符' })
  roleKey: string;

  @Column({ type: 'bigint', name: 'role_sort', comment: '角色排序' })
  roleSort: number;

  @Column({ type: 'bigint', name: 'data_scope', comment: '数据范围（0全部数据权限 1自定数据权限 2本部门数据权限 3本部门及以下数据权限 4仅本人数据权限）' })
  dataScope: number;

  @Column({ type: 'boolean', name: 'menu_check_strictly', default: true, comment: '菜单树选择项是否关联显示' })
  menuCheckStrictly: boolean;

  @Column({ type: 'boolean', name: 'dept_check_strictly', default: true, comment: '部门树选择项是否关联显示' })
  deptCheckStrictly: boolean;

  @Column({ type: 'char', name: 'status', comment: '状态（0正常 1停用）' })
  status: string;

  @Column({ type: 'bigint', name: 'del_flag', comment: '删除标志（0代表存在 2代表删除）' })
  delFlag: number;

  @Column({ type: 'varchar', name: 'remark', default: null, comment: '备注', length: 500 })
  remark: string;

  @ManyToMany(type => SysUser, user => user.roles)
  @JoinTable({
    name: 'sys_user_role',
    joinColumn: { name: 'role_id' },
    inverseJoinColumn: { name: 'user_id' }
  })
  users: SysUser[];

  @ManyToMany(type => SysMenu, menu => menu.roles)
  @JoinTable({
    name: 'sys_role_menu', // 中间表名，与Menu实体中的一致
    joinColumn: { name: 'role_id' }, // 角色在中间表的列名
    inverseJoinColumn: { name: 'menu_id' } // 菜单在中间表的列名
  })
  menus: SysMenu[];
}

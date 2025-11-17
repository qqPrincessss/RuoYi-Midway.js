import { Column, Entity, Index, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { User } from "./SysUser";
import { CommonEntity } from "../../../common/entity/common.entity";
import { SysMenu } from "./SysMenu";

@Index("sys_role_pkey", ["roleId"], { unique: true })
@Entity("sys_role", { schema: 'sys' })
export class SysRole extends CommonEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "role_id" })
  roleId: number;

  @Column("character varying", { name: "role_name", length: 100 })
  roleName: string;

  @Column("character varying", { name: "role_key", length: 100 })
  roleKey: string;

  @Column("integer", { name: "role_sort", default: () => "0" })
  roleSort: number;

  @Column("integer", { name: "data_scope", default: () => "0" })
  dataScope: number;

  @Column("integer", { name: "menu_check_strictly", default: () => 1 })
  menuCheckStrictly: number;

  @Column("integer", { name: "dept_check_strictly", default: () => 1 })
  deptCheckStrictly: number;

  @Column("character", { name: "status", length: 1, default: () => "'0'" })
  status: string;

  @Column("integer", { name: "del_flag", default: () => "0" })
  delFlag: number;

  @Column("character varying", { name: "remark", nullable: true, length: 500 })
  remark: string | null;

  @ManyToMany(type => User, user => user.roles)
  @JoinTable({
    name: 'sys_user_role',
    joinColumn: { name: 'role_id' },
    inverseJoinColumn: { name: 'user_id' }
  })
  users: User[];

  @ManyToMany(type => SysMenu, menu => menu.roles)
  @JoinTable({
    name: 'sys_role_menu', // 中间表名，与Menu实体中的一致
    joinColumn: { name: 'role_id' }, // 角色在中间表的列名
    inverseJoinColumn: { name: 'menu_id' } // 菜单在中间表的列名
  })
  menus: SysMenu[];
}

import { Column, Entity, Index } from "typeorm";

@Index("sys_role_menu_pkey", ["menuId", "roleId"], { unique: true })
@Entity("sys_role_menu", { schema: 'sys'})
export class SysRoleMenu {
  @Column("integer", { primary: true, name: "role_id" })
  roleId: number;

  @Column("integer", { primary: true, name: "menu_id" })
  menuId: number;
}

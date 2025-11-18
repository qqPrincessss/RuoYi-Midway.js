import {  Entity, PrimaryColumn} from "typeorm";

@Entity('sys_role_menu', { comment: '角色和菜单关联表' })
export class SysRoleMenu {
  @PrimaryColumn({ type: 'bigint', name: 'role_id', comment: '角色ID' })
  roleId: number;

  @PrimaryColumn({ type: 'bigint', name: 'menu_id', comment: '菜单ID' })
  menuId: number;
}

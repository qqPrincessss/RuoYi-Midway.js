import { Entity, PrimaryColumn} from "typeorm";

@Entity("sys_role_dept", { comment: '角色和部门关联表' })
export class SysRoleDept {
  @PrimaryColumn({ type: 'bigint', name: 'role_id', comment: '角色ID' })
  roleId: string;

  @PrimaryColumn({ type: 'bigint', name: 'dept_id', comment: '部门ID' })
  deptId: string;
}

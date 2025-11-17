import { Column, Entity, Index } from "typeorm";

@Index("sys_role_dept_pkey", ["deptId", "roleId"], { unique: true })
@Entity("sys_role_dept", { schema: 'sys' })
export class SysRoleDept {
  @Column("integer", { primary: true, name: "role_id" })
  roleId: string;

  @Column("integer", { primary: true, name: "dept_id" })
  deptId: string;
}

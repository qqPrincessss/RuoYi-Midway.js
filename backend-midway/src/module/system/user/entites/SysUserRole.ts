import { Column, Entity, Index } from "typeorm";

@Index("sys_user_role_pkey", ["roleId", "userId"], { unique: true })
@Entity("sys_user_role", { schema:'sys' })
export class SysUserRole {
  @Column("integer", { primary: true, name: "user_id" })
  userId: number;

  @Column("integer", { primary: true, name: "role_id" })
  roleId: number;
}

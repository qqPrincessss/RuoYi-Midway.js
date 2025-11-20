import { Entity, PrimaryColumn } from "typeorm";

@Entity("sys_user_role", { comment: '用户和角色关联表' }) 
export class SysUserRole {
  @PrimaryColumn({ type: 'bigint', name: 'user_id', comment: '用户ID' })
  userId: number;

  @PrimaryColumn({ type: 'bigint', name: 'role_id', comment: '角色ID' })
  roleId: number;
}

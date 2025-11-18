import {  Entity, PrimaryColumn } from "typeorm";

@Entity("sys_user_post", { comment: '用户和岗位关联表' })
export class SysUserPost {
  @PrimaryColumn({ type: 'bigint', name: 'user_id', comment: '用户ID' })
  userId: number;

  @PrimaryColumn({ type: 'bigint', name: 'post_id', comment: '岗位ID' })
  postId: number;
}

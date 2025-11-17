import { Column, Entity, Index } from "typeorm";

@Index("sys_user_post_pkey", ["postId", "userId"], { unique: true })
@Entity("sys_user_post", { schema: 'sys' })
export class SysUserPost {
  @Column("integer", { primary: true, name: "user_id" })
  userId: number;

  @Column("integer", { primary: true, name: "post_id" })
  postId: number;
}

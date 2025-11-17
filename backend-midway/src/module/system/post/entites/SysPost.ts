import { CommonEntity } from "../../common.entity";
import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./SysUser";

@Index("sys_post_pkey", ["postId"], { unique: true })
@Entity("sys_post", { schema: 'sys' })
export class SysPost extends CommonEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "post_id" })
  postId: number;

  @Column("character varying", { name: "post_code", length: 64 })
  postCode: string;

  @Column("character varying", { name: "post_name", length: 50 })
  postName: string;

  @Column("integer", { name: "post_sort" })
  postSort: number;

  @Column("character", { name: "status", length: 1 })
  status: string;

  @Column("character", {
    name: "del_flag",
    nullable: true,
    length: 1,
    default: () => "'0'",
  })
  delFlag: string | null;
  @Column("character varying", {
    name: "remark",
    nullable: true,
    length: 500,
    default: () => "NULL::character varying",
  })
  remark: string | null;
  @ManyToMany(type => User, user => user.posts)
  @JoinTable({
    name: "sys_user_post",
    joinColumn: { name: 'post_id', referencedColumnName: 'postId' }, // 岗位在中间表的列名
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'userId' } // 用户在中间表的列名
  })
  users: User[];
}

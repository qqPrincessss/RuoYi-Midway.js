import { CommonEntity } from "@module/common/entity/common.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { SysUser } from "../../user/entites/SysUser";

@Entity('sys_post', { comment: '岗位信息表' })
export class SysPost extends CommonEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'post_id', comment: '岗位ID' })
  postId: number;

  @Column({ type: 'varchar', name: 'post_code', comment: '岗位编码' })
  postCode: string;

  @Column({ type: 'varchar', name: 'post_name', comment: '岗位名称', })
  postName: string;

  @Column({ type: 'int', name: 'post_sort', comment: '岗位排序' })
  postSort: number;

  @Column({ type: 'char', name: 'status', comment: '状态（0正常 1停用）' })
  status: string;

  @Column({ type: 'varchar', name: 'remark', default: null, comment: '备注', length: 500 })
  remark: string;
  @ManyToMany(type => SysUser, user => user.posts)
  @JoinTable({
    name: "sys_user_post",
    joinColumn: { name: 'post_id', referencedColumnName: 'postId' }, // 岗位在中间表的列名
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'userId' } // 用户在中间表的列名
  })
  users: SysUser[];
}

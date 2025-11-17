import { Column, Entity, Index, PrimaryGeneratedColumn, ManyToMany, JoinTable, JoinColumn, OneToOne } from "typeorm";
import { SysRole } from "./SysRole";
import { CommonEntity } from "../../../common/entity/common.entity";
import { SysPost } from "./SysPost";
import { SysDept } from "./SysDept";
import { StudentEntity } from "../../user/student.entity";
import { TeacherEntity } from "../../teacher.entity";
@Index("user_pkey", ["userId"], { unique: true })
@Entity("sys_user", { schema: 'sys' })
export class User extends CommonEntity {
  @PrimaryGeneratedColumn({ comment: '用户ID', name: 'user_id' })
  userId: number;

  @Column({ comment: '部门ID', name: 'dept_id', default: null, })
  deptId: number;

  @Column({ comment: '登录账号', name: 'user_name', length: 30, })
  userName: string;

  @Column({ comment: '用户昵称', name: 'nick_name', length: 30, default: '', })
  nickName: string;

  @Column({ comment: '用户类型（00系统用户 01注册用户）', name: 'user_type', length: 2, default: '00', })
  userType: string;

  @Column({ comment: '用户邮箱', length: 50, default: '', })
  email: string;

  @Column({ comment: '手机号码', length: 11, default: '', })
  phonenumber: string;

  @Column({ comment: '用户性别（0男 1女 2未知）', default: null, })
  sex: string;

  @Column({ comment: '头像路径', length: 100, default: '', })
  avatar: string;

  @Column({ comment: '密码', length: 100, default: '', })
  password: string;

  @Column({ comment: '帐号状态（0正常 1停用）', default: '0', })
  status: string;

  @Column({ comment: '最后登录IP', name: 'login_ip', length: 50, default: '', })
  loginIp: string;

  @Column({ comment: '最后登录时间', name: 'login_date', default: null, })
  loginDate: Date;

  @Column({ type: 'varchar', name: 'remark', default: null, comment: '备注', length: 500 })
  remark: string;

  // 一个用户 对应 一个部门
  @OneToOne(type => SysDept)
  @JoinColumn({ name: 'dept_id' })
  dept: SysDept;

  // 多个用户 对应 多个角色
  @ManyToMany(type => SysRole, role => role.users)
  @JoinTable({
    name: 'sys_user_role', // 中间表名
    joinColumn: { name: 'user_id' }, // 用户在中间表的列名
    inverseJoinColumn: { name: 'role_id' } // 角色在中间表的列名
  })
  roles: SysRole[];

  // 多个用户 对应 多个岗位
  @ManyToMany(() => SysPost, post => post.users)
  @JoinTable({
    name: 'sys_user_post', // 中间表名
    joinColumn: { name: 'user_id' }, // 用户在中间表的列名
    inverseJoinColumn: { name: 'post_id' } // 岗位在中间表的列名
  })
  posts: SysPost[];
  @OneToOne(() => StudentEntity, (student) => student.user)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  student: StudentEntity;
  @OneToOne(() => TeacherEntity, (teacher) => teacher.user)
  teacher: TeacherEntity;
}

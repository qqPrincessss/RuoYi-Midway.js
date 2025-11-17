import { CommonEntity } from "../../common.entity";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GradeEntity } from "../../grade.entity";
import { GroupEntity } from "../../group.entity";
@Index("sys_dept_pkey", ["deptId"], { unique: true })
@Entity("sys_dept", { schema: "sys" })
export class SysDept extends CommonEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "dept_id" })
  deptId: Number;

  @Column("integer", { name: "parent_id", nullable: true, default: () => 0 })
  parentId: Number | null;

  @Column("character varying", {
    name: "ancestors",
    nullable: true,
    length: 50,
    default: () => "''",
  })
  ancestors: string | null;

  @Column("character varying", {
    name: "dept_name",
    nullable: true,
    length: 30,
    default: () => "''",
  })
  deptName: string | null;

  @Column("integer", { name: "order_num", nullable: true, default: () => "0" })
  orderNum: number | null;

  @Column("character varying", { name: "leader", nullable: true, length: 20 })
  leader: string | null;

  @Column("character varying", { name: "phone", nullable: true, length: 11 })
  phone: string | null;

  @Column("character varying", { name: "email", nullable: true, length: 50 })
  email: string | null;

  @Column("character", {
    name: "status",
    nullable: true,
    length: 1,
    default: () => "'0'",
  })
  status: string | null;
  @Column("character", {
    name: "del_flag",
    nullable: true,
    length: 1,
    default: () => "'0'",
  })
  delFlag: string | null;
  @OneToMany(() => GradeEntity, (gradeEntity) => gradeEntity.dept)
  children: GradeEntity[];
  @OneToMany(() => GroupEntity, (groupEntity) => groupEntity.dept)
  groups: GroupEntity[];
}

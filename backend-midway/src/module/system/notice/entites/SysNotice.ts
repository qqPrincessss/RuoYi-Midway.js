import { CommonEntity } from "../../common.entity";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("sys_notice_pkey", ["noticeId"], { unique: true })
@Entity("sys_notice", { schema: 'sys' })
export class SysNotice extends CommonEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "notice_id" })
  noticeId: number;

  @Column("character varying", { name: "notice_title", length: 50 })
  noticeTitle: string;

  @Column("character", { name: "notice_type", length: 1 })
  noticeType: string;

  @Column("character varying", {
    name: "notice_content",
    nullable: true,
    length: 2000,
    default: () => "NULL::character varying",
  })
  noticeContent: string | null;

  @Column("character", {
    name: "status",
    nullable: true,
    length: 1,
    default: () => "'0'",
  })
  status: string | null;

  @Column("character varying", {
    name: "remark",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  remark: string | null;

  @Column("character", {
    name: "del_flag",
    nullable: true,
    length: 1,
    default: () => "'0'",
  })
  delFlag: string | null;
}

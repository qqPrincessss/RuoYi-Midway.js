import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("sys_logininfor_pkey", ["infoId"], { unique: true })
@Index("idx_sys_logininfor_lt", ["loginTime"], {})
@Index("idx_sys_logininfor_s", ["status"], {})
@Entity("sys_logininfor", { schema: "sys" })
export class SysLogininfor {
  @PrimaryGeneratedColumn({ type: "integer", name: "info_id" })
  infoId: number;

  @Column("character varying", {
    name: "user_name",
    nullable: true,
    length: 50,
    default: () => "''",
  })
  userName: string | null;

  @Column("character varying", {
    name: "ipaddr",
    nullable: true,
    length: 128,
    default: () => "''",
  })
  ipaddr: string | null;

  @Column("character varying", {
    name: "browser",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  browser: string | null;

  @Column("character varying", {
    name: "os",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  os: string | null;

  @Column("character", {
    name: "status",
    nullable: true,
    length: 1,
    default: () => "'0'",
  })
  status: string | null;

  @Column("character varying", {
    name: "msg",
    nullable: true,
    length: 255,
    default: () => "''",
  })
  message: string | null;

  @Column("timestamp without time zone", { name: "login_time", nullable: true })
  loginTime: Date | null;

  @Column("character varying", {
    name: "login_location",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  loginLocation: string | null;
  @Column("character", {
    name: "del_flag",
    nullable: true,
    length: 1,
    default: () => "'0'",
  })
  delFlag: string | null;
}

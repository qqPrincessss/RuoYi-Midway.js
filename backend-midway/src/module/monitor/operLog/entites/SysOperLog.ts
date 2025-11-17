import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_sys_oper_log_bt", ["businessType"], {})
@Index("sys_oper_log_pkey", ["operId"], { unique: true })
@Index("idx_sys_oper_log_ot", ["operTime"], {})
@Index("idx_sys_oper_log_s", ["status"], {})
@Entity("sys_oper_log", { schema: "sys" })
export class SysOperLog {
  @PrimaryGeneratedColumn({ type: "integer", name: "oper_id" })
  operId: number;

  @Column("character varying", {
    name: "title",
    nullable: true,
    length: 50,
    default: () => "''",
  })
  title: string | null;

  @Column("integer", {
    name: "business_type",
    nullable: true,
    default: () => "0",
  })
  businessType: number | null;

  @Column("character varying", {
    name: "method",
    nullable: true,
    length: 200,
    default: () => "''",
  })
  method: string | null;

  @Column("character varying", {
    name: "request_method",
    nullable: true,
    length: 10,
    default: () => "''",
  })
  requestMethod: string | null;

  @Column("integer", {
    name: "operator_type",
    nullable: true,
    default: () => "0",
  })
  operatorType: number | null;

  @Column("character varying", {
    name: "oper_name",
    nullable: true,
    length: 50,
    default: () => "''",
  })
  operName: string | null;

  @Column("character varying", {
    name: "oper_url",
    nullable: true,
    length: 255,
    default: () => "''",
  })
  operUrl: string | null;

  @Column("character varying", {
    name: "oper_ip",
    length: 128,
    default: () => "''",
  })
  operIp: string;

  @Column("character varying", {
    name: "oper_location",
    nullable: true,
    length: 255,
    default: () => "''",
  })
  operLocation: string | null;

  @Column("character varying", {
    name: "oper_param",
    nullable: true,
    length: 2000,
    default: () => "''",
  })
  operParam: string | null;

  @Column("character varying", {
    name: "json_result",
    nullable: true,
    length: 2000,
    default: () => "''",
  })
  jsonResult: string | null;

  @Column("integer", { name: "status", nullable: true, default: () => "0" })
  status: number | null;

  @Column("character varying", {
    name: "error_msg",
    nullable: true,
    length: 2000,
    default: () => "''",
  })
  errorMsg: string | null;

  @Column("timestamp without time zone", { name: "oper_time", nullable: true })
  operTime: Date | null;

  @Column("integer", { name: "cost_time", nullable: true, default: () => "0" })
  costTime: number | null;
}

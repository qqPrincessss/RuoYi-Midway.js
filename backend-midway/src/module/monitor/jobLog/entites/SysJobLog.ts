import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("monitor_job_log_pkey", ["jobLogId"], { unique: true })
@Entity("sys_job_log", { schema: "sys" })
export class MonitorJobLog {
  @PrimaryGeneratedColumn({ type: "integer", name: "job_log_id" })
  jobLogId: number;

  @Column("character varying", { name: "job_name", length: 64 })
  jobName: string;

  @Column("character varying", { name: "job_group", length: 64 })
  jobGroup: string;

  @Column("character varying", { name: "invoke_target", length: 500 })
  invokeTarget: string;

  @Column("character varying", {
    name: "job_message",
    nullable: true,
    length: 500,
    default: () => "NULL::character varying",
  })
  jobMessage: string | null;

  @Column("character", {
    name: "status",
    nullable: true,
    length: 1,
    default: () => "'0'",
  })
  status: string | null;

  @Column("character varying", {
    name: "exception_info",
    nullable: true,
    length: 2000,
    default: () => "''",
  })
  exceptionInfo: string | null;

  @Column("timestamp without time zone", {
    name: "create_time",
    nullable: true,
  })
  createTime: Date | null;
}

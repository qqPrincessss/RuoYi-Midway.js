import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { CommonEntity } from "../../../common/entity/common.entity";
@Index("monitor_job_pkey", ["jobGroup", "jobId", "jobName"], { unique: true })
@Index("idx_monitor_job_jg", ["jobGroup"], {})
@Entity("sys_job", { schema: "sys" })
export class MonitorJob extends CommonEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "job_id" })
  jobId: number;

  @Column("character varying", {
    primary: true,
    name: "job_name",
    length: 64,
    default: () => "''",
  })
  jobName: string;

  @Column("character varying", {
    primary: true,
    name: "job_group",
    length: 64,
    default: () => "'DEFAULT'",
  })
  jobGroup: string;

  @Column("character varying", { name: "invoke_target", length: 500 })
  invokeTarget: string;

  @Column("character varying", {
    name: "cron_expression",
    nullable: true,
    length: 255,
    default: () => "''",
  })
  cronExpression: string | null;

  @Column("integer", {
    name: "misfire_policy",
    nullable: true,
    default: () => "3",
  })
  misfirePolicy: number | null;

  @Column("integer", { name: "concurrent", nullable: true, default: () => "1" })
  concurrent: number | null;

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
    length: 500,
    default: () => "''",
  })
  remark: string | null;
}

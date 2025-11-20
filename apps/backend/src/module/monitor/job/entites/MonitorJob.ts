import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CommonEntity } from "@module/common/entity/common.entity";
// 定时任务表 -  实体类
@Entity('monitor_job', { comment: '定时任务表' })
export class MonitorJob extends CommonEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'job_id', comment: '任务ID' })
  jobId: number;

  @Column({ type: 'varchar', name: 'job_name', length: 100, default: '', comment: '参数名称' })
  jobName: string;

  @Column({ type: 'varchar', name: 'job_group', length: 100, default: 'DEFAULT', comment: '任务组名' })
  jobGroup: string;

  @Column({ type: 'varchar', name: 'invoke_target', length: 500, comment: '调用目标字符串' })
  invokeTarget: string;

  @Column({ type: 'varchar', name: 'cron_expression', length: 255, default: '', comment: 'cron执行表达式' })
  cronExpression: string;

  @Column({ type: 'int', name: 'misfire_policy', default: 3, comment: '计划执行错误策略（1立即执行 2执行一次 3放弃执行）' })
  misfirePolicy: number;

  @Column({ type: 'int', name: 'concurrent', default: 1, comment: '是否并发执行（0允许 1禁止）' })
  concurrent: number;

  @Column({ type: 'char', name: 'status', length: 1, default: '0', comment: '状态（0正常 1暂停）' })
  status: string;

  @Column({ type: 'varchar', name: 'remark', length: 500, default: null, comment: '备注' })
  remark: string;
}

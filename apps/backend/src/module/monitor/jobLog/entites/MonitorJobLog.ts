import { Column, CreateDateColumn, Entity,  PrimaryGeneratedColumn } from "typeorm";

// 定时任务表 -  实体类
@Entity('monitor_job_log', { comment: '定时任务日志表' })
export class MonitorJobLog {
 @PrimaryGeneratedColumn({ type: 'bigint', name: 'job_log_id', comment: '任务日志ID' })
  jobLogId: number;

  @Column({ type: 'varchar', name: 'job_name', length: 100, default: '', comment: '参数名称' })
  jobName: string;

  @Column({ type: 'varchar', name: 'job_group', length: 100, default: 'DEFAULT', comment: '任务组名' })
  jobGroup: string;

  @Column({ type: 'varchar', name: 'invoke_target', length: 500, comment: '调用目标字符串' })
  invokeTarget: string;

  @Column({ type: 'varchar', name: 'job_message', length: 500, comment: '日志信息' })
  jobMessage: string;

  @Column({ type: 'char', name: 'status', length: 1, default: '0', comment: '状态（0正常 1失败）' })
  status: string;

  @Column({ type: 'varchar', name: 'exception_info', length: 2000, comment: '异常信息' })
  exceptionInfo: string;

  @CreateDateColumn({ type: 'timestamp', name: 'create_time', comment: '创建时间', })
  createTime: Date;
}

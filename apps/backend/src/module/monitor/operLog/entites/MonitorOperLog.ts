import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('monitor_oper_log', { comment: '操作日志记录' })
export class MonitorOperLog {
  @PrimaryGeneratedColumn({ type: 'int', name: 'oper_id', comment: '日志主键' })
  operId: number;

  @Column({ type: 'varchar', name: 'title', default: '', comment: '模块标题' })
  title: string;

  @Column({ type: 'int', name: 'business_type', default: 0, comment: '业务类型（0其它 1新增 2修改 3删除）' })
  businessType: number;

  @Column({ type: 'varchar', name: 'method', default: '', comment: '方法名称' })
  method: string;

  @Column({ type: 'varchar', name: 'request_method', default: '', comment: '请求方式' })
  requestMethod: string;

  @Column({ type: 'int', name: 'operator_type', default: 0, comment: '操作类别（0其它 1后台用户 2手机端用户）' })
  operatorType: number;

  @Column({ type: 'varchar', name: 'oper_name', default: '', comment: '操作人员' })
  operName: string;

  @Column({ type: 'varchar', name: 'oper_url', default: '', comment: '请求URL' })
  operUrl: string;

  @Column({ type: 'varchar', name: 'oper_ip', default: '', comment: '主机地址' })
  operIp: string;

  @Column({ type: 'varchar', name: 'oper_location', default: '', comment: '操作地点' })
  operLocation: string;

  @Column({ type: 'varchar', name: 'oper_param', default: '', comment: '请求参数' })
  operParam: string;

  @Column({ type: 'varchar', name: 'json_result', default: '', comment: '返回参数' })
  jsonResult: string;

  @Column({ type: 'char', name: 'status', default: '0', comment: '操作状态（0正常 1异常）' })
  status: string;

  @Column({ type: 'varchar', name: 'error_msg', default: '', comment: '错误消息' })
  errorMsg: string;

  @CreateDateColumn({ type: "timestamp without time zone", name: 'oper_time', comment: '操作时间' })
  operTime: Date;

  @Column({ type: 'int', name: 'cost_time', default: 0, comment: '消耗时间' })
  costTime: number;
}

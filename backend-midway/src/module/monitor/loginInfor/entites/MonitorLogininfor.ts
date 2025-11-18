import { Column, CreateDateColumn, Entity,  PrimaryGeneratedColumn } from "typeorm";

// 登录日志表 -  实体类
@Entity('monitor_login_infor', { comment: '登录日志记录' })
export class MonitorLogininfor {
@PrimaryGeneratedColumn({ type: 'int', name: 'info_id', comment: '访问ID' })
  infoId: number;

  @Column({ type: 'varchar', name: 'user_name', default: '', comment: '用户账号' })
  userName: string;

  @Column({ type: 'varchar', name: 'ipaddr', default: '', comment: '登录IP地址' })
  ipaddr: string;

  @Column({ type: 'varchar', name: 'browser', default: '', comment: '浏览器类型' })
  browser: string;

  @Column({ type: 'varchar', name: 'os', default: '', comment: '操作系统' })
  os: string;

  @Column({ type: 'varchar', name: 'login_location', length: 255, default: '', comment: '登陆地点' })
  loginLocation: string;

  @Column({ type: 'varchar', name: 'status', default: '', comment: '登录状态（0成功 1失败）' })
  status: string;

  @Column({ type: 'varchar', name: 'msg', default: '', comment: '提示消息' })
  msg: string;

  @CreateDateColumn({ type: 'datetime', name: 'login_time', comment: '访问时间' })
  loginTime: Date;
}

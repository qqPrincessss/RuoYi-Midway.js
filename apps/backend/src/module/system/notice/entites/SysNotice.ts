import { CommonEntity } from "@module/common/entity/common.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// 通知公告表 -  实体类
@Entity('sys_notice', { comment: '通知公告表' })
export class SysNotice extends CommonEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'notice_id', comment: '公告ID' })
  noticeId: number;

  @Column({ type: 'varchar', name: 'notice_title', length: 50, default: '', comment: '公告标题' })
  noticeTitle: string;

  @Column({ type: 'char', name: 'notice_type', nullable: false, comment: '公告类型（1通知 2公告）' })
  noticeType: string;

  @Column({ type: 'varchar', name: 'notice_content', length: 2000, default: null, comment: '公告内容' })
  noticeContent: string;

  @Column({ type: 'char', name: 'status', nullable: false, comment: '公告状态（0正常 1关闭）' })
  status: string;

  @Column({ type: 'varchar', name: 'remark', default: null, comment: '备注', length: 500 })
  remark: string;
}

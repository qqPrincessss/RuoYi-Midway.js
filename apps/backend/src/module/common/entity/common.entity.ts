import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';


export abstract class CommonEntity {

  @Column({ type: 'varchar', comment: '创建者', name: 'create_by', length: 64 })
  createBy: string;

  @CreateDateColumn({ type: 'timestamp', comment: '创建时间', name: 'create_time' })
  createTime: Date;

  @Column({ type: 'varchar', comment: '更新者', name: 'update_by', length: 64 })
  updateBy: string;

  @UpdateDateColumn({ type: 'timestamp', comment: '更新时间', name: 'update_time' })
  updateTime: Date;


  setCreateBy(userName: string) {
    this.createBy = userName;
  }

  setUpdateBy(userName: string) {
    this.updateBy = userName;
  }
}

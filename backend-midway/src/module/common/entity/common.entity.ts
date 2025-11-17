import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';


export abstract class CommonEntity {

  @Column("character varying", {
    name: "create_by",
    default: () => "''",
  })
  createBy: string ;

  @CreateDateColumn({ type: 'timestamp', comment: '创建时间', name: 'create_time' })
  createTime: Date ;

  @Column("character varying", {
    name: "update_by",
    default: () => "''",
  })
  updateBy: string ;

  @UpdateDateColumn({ type: 'timestamp', comment: '更新时间', name: 'update_time' })
  updateTime: Date ;

  setCreateBy(userName: string) {
    this.createBy = userName;
    this.createTime = new Date();
  }

  setUpdateBy(userName: string) {
    this.updateBy = userName;
    this.updateTime = new Date();
  }
}

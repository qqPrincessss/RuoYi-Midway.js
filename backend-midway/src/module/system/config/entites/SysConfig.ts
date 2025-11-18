import { CommonEntity } from "../../../common/entity/common.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// 参数配置表 -  实体类
@Entity('sys_config', { comment: '参数配置表' })
export class SysConfig extends CommonEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'config_id', comment: '参数主键' })
  configId: number;

  @Column({ type: 'varchar', name: 'config_name', length: 100, default: '', comment: '参数名称' })
  configName: string;

  @Column({ type: 'varchar', name: 'config_key', length: 100, default: '', comment: '参数键名' })
  configKey: string;

  @Column({ type: 'varchar', name: 'config_value', length: 500, default: '', comment: '参数键值' })
  configValue: string;

  @Column({ type: 'char', name: 'config_type', length: 1, default: 'N', comment: '系统内置（Y是 N否）' })
  configType: string;

  @Column({ type: 'varchar', name: 'remark', default: null, comment: '备注', length: 500 })
  remark: string;
}

import { CommonEntity } from "../../../common/entity/common.entity";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("sys_config_pkey", ["configId"], { unique: true })
@Entity("sys_config", { schema: "sys" })
export class SysConfig extends CommonEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "config_id" })
  configId: number;

  @Column("character varying", {
    name: "config_name",
    nullable: true,
    length: 100,
    default: () => "''",
  })
  configName: string | null;

  @Column("character varying", {
    name: "config_key",
    nullable: true,
    length: 100,
    default: () => "''",
  })
  configKey: string | null;

  @Column("character varying", {
    name: "config_value",
    nullable: true,
    length: 500,
    default: () => "''",
  })
  configValue: string | null;

  @Column("character", {
    name: "config_type",
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  configType: string | null;

  @Column("character varying", {
    name: "remark",
    nullable: true,
    length: 500,
    default: () => "NULL::character varying",
  })
  remark: string | null;
  @Column("character", {
    name: "status",
    nullable: true,
    length: 1,
    default: () => "'0'",
  })
  status: string;
  @Column("character", {
    name: "del_flag",
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  delFlag: string;
}

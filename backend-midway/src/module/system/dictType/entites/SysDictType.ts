import { CommonEntity } from "../../../common/entity/common.entity";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("sys_dict_type_pkey", ["dictId"], { unique: true })
@Index("sys_dict_type_dict_type_key", ["dictType"], { unique: true })
@Entity("sys_dict_type", { schema: "sys" })
export class SysDictType extends CommonEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "dict_id" })
  dictId: number;

  @Column("character varying", {
    name: "dict_name",
    nullable: true,
    length: 100,
    default: () => "''",
  })
  dictName: string | null;

  @Column("character varying", {
    name: "dict_type",
    nullable: true,
    unique: true,
    length: 100,
    default: () => "''",
  })
  dictType: string | null;

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
    default: () => "NULL::character varying",
  })
  remark: string | null;

  @Column("character", {
    name: "del_flag",
    nullable: true,
    length: 1,
    default: () => "'0'",
  })
  delFlag: string | null;
}

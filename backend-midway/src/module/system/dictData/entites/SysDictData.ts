import { CommonEntity } from "../../../common/entity/common.entity";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("sys_dict_data_pkey", ["dictCode"], { unique: true })
@Entity("sys_dict_data", { schema: "sys" })
export class SysDictData extends CommonEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "dict_code" })
  dictCode: number;

  @Column("integer", { name: "dict_sort", nullable: true, default: () => "0" })
  dictSort: number | null;

  @Column("character varying", {
    name: "dict_label",
    nullable: true,
    length: 100,
    default: () => "''",
  })
  dictLabel: string | null;

  @Column("character varying", {
    name: "dict_value",
    nullable: true,
    length: 100,
    default: () => "''",
  })
  dictValue: string | null;

  @Column("character varying", {
    name: "dict_type",
    nullable: true,
    length: 100,
    default: () => "''",
  })
  dictType: string | null;

  @Column("character varying", {
    name: "css_class",
    nullable: true,
    length: 100,
    default: () => "NULL::character varying",
  })
  cssClass: string | null;

  @Column("character varying", {
    name: "list_class",
    nullable: true,
    length: 100,
    default: () => "NULL::character varying",
  })
  listClass: string | null;

  @Column("character", {
    name: "is_default",
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  isDefault: string | null;

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

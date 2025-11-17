import { CommonEntity } from "@module/common/entity/common.entity";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("gen_table_pkey", ["tableId"], { unique: true })
@Entity("gen_table", { schema: "public" })
export class GenTable extends CommonEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "table_id" })
  tableId: number;

  @Column("character varying", {
    name: "table_name",
    nullable: true,
    length: 200,
    default: () => "''",
  })
  tableName: string | null;

  @Column("character varying", {
    name: "table_comment",
    nullable: true,
    length: 500,
    default: () => "''",
  })
  tableComment: string | null;

  @Column("character varying", {
    name: "sub_table_name",
    nullable: true,
    length: 64,
    default: () => "NULL::character varying",
  })
  subTableName: string | null;

  @Column("character varying", {
    name: "sub_table_fk_name",
    nullable: true,
    length: 64,
    default: () => "NULL::character varying",
  })
  subTableFkName: string | null;

  @Column("character varying", {
    name: "class_name",
    nullable: true,
    length: 100,
    default: () => "''",
  })
  className: string | null;

  @Column("character varying", {
    name: "tpl_category",
    nullable: true,
    length: 200,
    default: () => "'crud'",
  })
  tplCategory: string | null;

  @Column("character varying", {
    name: "tpl_web_type",
    nullable: true,
    length: 30,
    default: () => "''",
  })
  tplWebType: string | null;

  @Column("character varying", {
    name: "package_name",
    nullable: true,
    length: 100,
    default: () => "NULL::character varying",
  })
  packageName: string | null;

  @Column("character varying", {
    name: "module_name",
    nullable: true,
    length: 30,
    default: () => "NULL::character varying",
  })
  moduleName: string | null;

  @Column("character varying", {
    name: "business_name",
    nullable: true,
    length: 30,
    default: () => "NULL::character varying",
  })
  businessName: string | null;

  @Column("character varying", {
    name: "function_name",
    nullable: true,
    length: 50,
    default: () => "NULL::character varying",
  })
  functionName: string | null;

  @Column("character varying", {
    name: "function_author",
    nullable: true,
    length: 50,
    default: () => "NULL::character varying",
  })
  functionAuthor: string | null;

  @Column("character", {
    name: "gen_type",
    nullable: true,
    length: 1,
    default: () => "'0'",
  })
  genType: string | null;

  @Column("character varying", {
    name: "gen_path",
    nullable: true,
    length: 200,
    default: () => "'/'",
  })
  genPath: string | null;

  @Column("character varying", {
    name: "options",
    nullable: true,
    length: 1000,
    default: () => "NULL::character varying",
  })
  options: string | null;


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
  status: string | null;
  @Column("character", {
    name: "del_flag",
    nullable: true,
    length: 1,
    default: () => "'0'",
  })
  delFlag: string | null;
}

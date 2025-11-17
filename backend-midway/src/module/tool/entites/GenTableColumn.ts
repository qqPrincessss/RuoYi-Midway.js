import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { CommonEntity } from "../../common.entity";

@Index("gen_table_column_pkey", ["columnId"], { unique: true })
@Entity("gen_table_column", { schema: "public" })
export class GenTableColumn  extends CommonEntity{
  @PrimaryGeneratedColumn({ type: "integer", name: "column_id" })
  columnId: number;

  @Column("integer", { name: "table_id", nullable: true })
  tableId: number | null;

  @Column("character varying", {
    name: "column_name",
    nullable: true,
    length: 200,
    default: () => "NULL::character varying",
  })
  columnName: string | null;

  @Column("character varying", {
    name: "column_comment",
    nullable: true,
    length: 500,
    default: () => "NULL::character varying",
  })
  columnComment: string | null;

  @Column("character varying", {
    name: "column_type",
    nullable: true,
    length: 100,
    default: () => "NULL::character varying",
  })
  columnType: string | null;

  @Column("character varying", {
    name: "java_type",
    nullable: true,
    length: 500,
    default: () => "NULL::character varying",
  })
  javaType: string | null;

  @Column("character varying", {
    name: "java_field",
    nullable: true,
    length: 200,
    default: () => "NULL::character varying",
  })
  javaField: string | null;

  @Column("character", {
    name: "is_pk",
    nullable: true,
    length: 1,
    default: () => "NULL::bpchar",
  })
  isPk: string | null;

  @Column("character", {
    name: "is_increment",
    nullable: true,
    length: 1,
    default: () => "NULL::bpchar",
  })
  isIncrement: string | null;

  @Column("character", {
    name: "is_required",
    nullable: true,
    length: 1,
    default: () => "NULL::bpchar",
  })
  isRequired: string | null;

  @Column("character", {
    name: "is_insert",
    nullable: true,
    length: 1,
    default: () => "NULL::bpchar",
  })
  isInsert: string | null;

  @Column("character", {
    name: "is_edit",
    nullable: true,
    length: 1,
    default: () => "NULL::bpchar",
  })
  isEdit: string | null;

  @Column("character", {
    name: "is_list",
    nullable: true,
    length: 1,
    default: () => "NULL::bpchar",
  })
  isList: string | null;

  @Column("character", {
    name: "is_query",
    nullable: true,
    length: 1,
    default: () => "NULL::bpchar",
  })
  isQuery: string | null;

  @Column("character varying", {
    name: "query_type",
    length: 200,
    default: () => "'EQ'",
  })
  queryType: string;

  @Column("character varying", {
    name: "html_type",
    nullable: true,
    length: 200,
    default: () => "NULL::character varying",
  })
  htmlType: string | null;

  @Column("character varying", {
    name: "dict_type",
    nullable: true,
    length: 200,
    default: () => "''",
  })
  dictType: string | null;

  @Column("integer", { name: "sort", nullable: true })
  sort: number | null;


  @Column("character varying", {
    name: "column_default",
    nullable: true,
    length: 255,
  })
  columnDefault: string | null;

  @Column("character", { name: "status", length: 1, default: () => "0" })
  status: string;

  @Column("character", { name: "del_flag", length: 1, default: () => "0" })
  delFlag: string;

  @Column("character varying", { name: "remark", nullable: true, length: 255 })
  remark: string | null;
}

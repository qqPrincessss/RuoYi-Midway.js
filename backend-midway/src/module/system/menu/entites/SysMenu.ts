import { CommonEntity } from '../../common.entity';
import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SysRole } from './SysRole';

@Index('sys_menu_pkey', ['menuId'], { unique: true })
@Entity('sys_menu', { schema: 'sys' })
export class SysMenu extends CommonEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "menu_id" })
  menuId: number;

  @Column('character varying', { name: 'menu_name', length: 255 })
  menuName: string;

  @Column('integer', { name: 'parent_id', nullable: true, default: () => '0' })
  parentId: number | null;

  @Column('integer', { name: 'order_num', nullable: true, default: () => '0' })
  orderNum: number | null;

  @Column('character varying', { name: 'path', nullable: true, length: 255 })
  path: string | null;

  @Column('character varying', { name: 'route_name', nullable: true, length: 255 })
  routeName: string | null;

  @Column('character varying', {
    name: 'component',
    nullable: true,
    length: 255,
  })
  component: string | null;

  @Column('character varying', { name: 'query', nullable: true, length: 255 })
  query: string | null;

  @Column('integer', { name: 'is_frame', nullable: true, default: () => '1' })
  isFrame: number | null;

  @Column('integer', { name: 'is_cache', nullable: true, default: () => '0' })
  isCache: number | null;

  @Column('character', {
    name: 'menu_type',
    nullable: true,
    length: 1,
    default: () => "'M'",
  })
  menuType: string | null;

  @Column('character', {
    name: 'visible',
    nullable: true,
    length: 1,
    default: () => "'0'",
  })
  visible: string | null;

  @Column('character', {
    name: 'status',
    nullable: true,
    length: 1,
    default: () => "'0'",
  })
  status: string | null;

  @Column('character varying', { name: 'perms', nullable: true, length: 100 })
  perms: string | null;

  @Column('character varying', { name: 'icon', nullable: true, length: 100 })
  icon: string | null;

  @Column('character varying', { name: 'remark', nullable: true, length: 500 })
  remark: string | null;
  @Column("character", {
    name: "del_flag",
    nullable: true,
    length: 1,
    default: () => "'0'",
  })
  delFlag: string | null;
  @ManyToMany(type => SysRole, role => role.menus)
  @JoinTable({
    name: 'sys_role_menu', // 中间表名，与Menu实体中的一致
    joinColumns: [{ name: 'menu_id' }], // 菜单在中间表的列名
    inverseJoinColumns: [{ name: 'role_id' }] // 角色在中间表的列名
  })
  roles: SysRole[];
}

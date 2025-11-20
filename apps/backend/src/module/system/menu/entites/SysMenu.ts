import { CommonEntity } from '../../../common/entity/common.entity';
import { Column, Entity,  JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SysRole } from '../../role/entites/SysRole';

// 菜单表-实体类
@Entity('sys_menu', {comment: '菜单信息表'})
export class SysMenu extends CommonEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'menu_id', comment: '菜单ID' })
  menuId: number;

  @Column({ type: 'varchar', name: 'menu_name', length: 50, comment: '菜单名称' })
  menuName: string;

  @Column({ type: 'int', name: 'parent_id', default: 0, comment: '父菜单ID' })
  parentId: number;

  @Column({ type: 'bigint', name: 'order_num', default: 0, comment: '显示顺序' })
  orderNum: number;

  @Column({ type: 'varchar', length: 200, comment: '路由地址' })
  path: string;

  @Column({ type: 'varchar', length: 255, comment: '组件路径' })
  component: string;

  @Column({ type: 'varchar', length: 255, comment: '路由参数' })
  query: string;

  @Column({ type: 'int', name: 'is_frame', default: 1, comment: '是否为外链（0是 1否）' })
  isFrame: number;

  @Column({ type: 'int', name: 'is_cache', default: 0, comment: '是否缓存（0缓存 1不缓存）' })
  isCache: number;

  @Column({ type: 'char', name: 'menu_type', length: 1, default: 'M', comment: '菜单类型（M目录 C菜单 F按钮）' })
  menuType: string;

  @Column({ type: 'char', length: 1, default: 0, comment: '菜单状态（0显示 1隐藏）' })
  visible: string;

  @Column({ type: 'char', length: 1, default: 0, comment: '菜单状态（0正常 1停用）' })
  status: string;

  @Column({ type: 'varchar', name: 'perms', length: 100, comment: '权限标识' })
  perms: string;

  @Column({ type: 'varchar', length: 100, comment: '菜单图标' })
  icon: string;

  @Column({ type: 'varchar', name: 'remark', default: null, comment: '备注', length: 500 })
  remark: string;

  @ManyToMany(type => SysRole, role => role.menus)
  @JoinTable({
    name: 'sys_role_menu', // 中间表名，与Menu实体中的一致
    joinColumns: [{ name: 'menu_id' }], // 菜单在中间表的列名
    inverseJoinColumns: [{ name: 'role_id' }] // 角色在中间表的列名
  })
  roles: SysRole[];
}

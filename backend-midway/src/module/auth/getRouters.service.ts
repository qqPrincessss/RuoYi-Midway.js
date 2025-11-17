import { Provide, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from "@midwayjs/typeorm";
import { Repository } from "typeorm";
import { SysMenu } from "../system/menu/entites/SysMenu";
import { User } from "../system/user/entites/SysUser";
import { handleMenuTree } from '@utils/tree';
import { resBuild } from "@utils/resBuild";

/**
 * getRouters()：获取基本的菜单路由表，按身份
 */

@Provide()
export class GetRouterService {

  @Inject()
  ctx: Context;

  @InjectEntityModel(SysMenu)
  protected SysMenu: Repository<SysMenu>;

  @InjectEntityModel(User)
  protected User: Repository<User>;

  // 查询菜单路由
  async getRouters() {
    // 如果user_id为1，则为超管，获取所有菜单；否则根据user_id获取菜单
    const userId = this.ctx.session.userInfo.userId;
    // 如果是超级管理员，则获取所有菜单
    if (userId === 1) {
      // 所有菜单，取其中一部分字段
      const allMenus = await this.SysMenu.find({
        select: ['menuId', 'menuName', 'parentId', 'path', 'component', 'menuType', 'visible', 'status', 'icon', 'isCache', 'isFrame'],
        order: {
          orderNum: 'ASC',
          createTime: 'DESC'
        }
      });
      // 只保留菜单和目录
      const filterMenus = allMenus.filter(item => item.menuType === 'M' || item.menuType === 'C');
      return resBuild.data(handleMenuTree(filterMenus) || [])
    } else {
      // 用 QB 加载并排序角色与菜单
      const userResult = await this.User
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.roles', 'roles')
        .leftJoinAndSelect('roles.menus', 'menus')
        .where('user.userId = :userId', { userId })
        .orderBy('roles.createTime', 'DESC')
        .addOrderBy('menus.orderNum', 'ASC')
        .addOrderBy('menus.createTime', 'DESC')
        .getOne();

      const menuList = [];
      // 保险起见，再在内存中排序一次
      userResult?.roles?.sort((a, b) => {
        return (b.createTime?.getTime() ?? 0) - (a.createTime?.getTime() ?? 0);
      });
      userResult?.roles?.forEach(role => {
        role.menus = (role.menus || []).sort((x, y) => {
          return (x.orderNum ?? 0) - (y.orderNum ?? 0);
        });
        menuList.push(...role.menus);
      });

      // 去重并只保留目录/菜单
      const uniq = new Map<number, SysMenu>();
      for (const m of menuList) uniq.set(m.menuId, m);
      const filterMenus = Array.from(uniq.values()).filter(
        item => item.menuType === 'M' || item.menuType === 'C'
      );

      return resBuild.data(handleMenuTree(filterMenus) || []);
    }
  }
  // 获取系统信息
  async getSystemInfo() {
    
  }
}

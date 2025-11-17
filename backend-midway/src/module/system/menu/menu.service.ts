
import { Inject, Provide } from "@midwayjs/core";
import { MenuDao } from "./menu.dao";
import { ListMenuDTO, CreateMenuDTO, UpdateMenuDTO } from "./dto/menu.dto";
@Provide()
export class MenuService {
  @Inject()
  menuDao: MenuDao

  //获取菜单列表
  async getMenuList(queryParams: ListMenuDTO) {
    return await this.menuDao.getMenuList(queryParams)
  }

  // 添加菜单
  async addMenu(addMenu: CreateMenuDTO) {
    return await this.menuDao.addMenu(addMenu)
  }

  // 删除菜单
  async delMenu(menuId: string) {
    return await this.menuDao.delMenu(menuId)
  }

  //更新菜单
  async update(menu: UpdateMenuDTO) {
    return await this.menuDao.update(menu);
  }

  //获取菜单详情
  async detail(menuId: number) {
    return await this.menuDao.detail(menuId);
  }
  async treeSelect() {
    return await this.menuDao.treeSelect();
  }
  // 根据角色ID查询菜单下拉树结构
  async getTreeSelectByRoleId(roleId: number) {
    return await this.menuDao.getTreeSelectByRoleId(roleId);
  }
}

import { Provide, Context, Inject } from "@midwayjs/core";
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { SysMenu } from './entites/SysMenu';
import { SysRoleMenu } from "../role/entites/SysRoleMenu";
import { ListMenuDTO, CreateMenuDTO, UpdateMenuDTO } from "./dto/menu.dto";
import { checkIfExsit } from "@utils/serviceHelp";
import { resBuild } from '@utils/resBuild';
import { getOperator } from "@utils";
import { listToTree } from "@utils/tree";

@Provide()
export class MenuDao {
  @InjectEntityModel(SysMenu)
  menuModel: Repository<SysMenu>;

  @InjectEntityModel(SysRoleMenu)
  roleMenuModel: Repository<SysRoleMenu>;

  @Inject()
  ctx: Context;

  //获取菜单列表
  async getMenuList(queryParams: ListMenuDTO) {
    console.log(queryParams);
    const queryBuilder = this.menuModel.createQueryBuilder('entity');
    if (queryParams.menuName) {
      queryBuilder.andWhere('entity.menuName LIKE :menuName', { menuName: `%${queryParams.menuName}%` });
    }
    if (queryParams.status) {
      queryBuilder.andWhere('entity.status = :status', { status: queryParams.status });
    }
    queryBuilder.addOrderBy('entity.orderNum', 'ASC');
    queryBuilder.addOrderBy('entity.createTime', 'DESC');
    const rows = await queryBuilder.getMany();
    return resBuild.data(rows);
  }

  //添加菜单

  async addMenu(addMenu: CreateMenuDTO) {
    await checkIfExsit(this.menuModel, "menuName", addMenu.menuName)
    const myEntity = this.menuModel.create(addMenu);
    myEntity.setCreateBy(getOperator(this.ctx))
    console.log(myEntity);
    await this.menuModel.save(myEntity);
    if (myEntity.menuType === 'C') {
      const parent = await this.menuModel.findOne({ where: { menuName: addMenu.menuName } });
      const parentId = parent.menuId;
      await this.getChildMenus(parentId, addMenu.menuName, addMenu.perms);
    }
    return resBuild.success();
  }

  //删除菜单
  async delMenu(menuId: string) {
    const ids = menuId.split(',').map(id => Number(id));
    for (const id of ids) {
      const childMenus = await this.menuModel.find({ where: { parentId: id } });
      if (childMenus.length > 0) {
        return resBuild.error(`菜单ID ${id} 存在子菜单，无法删除`);
      }
    }
    await this.menuModel.delete(ids);
    return resBuild.success();
  }

  //更新菜单
  async update(menu: UpdateMenuDTO) {
    const entity = this.menuModel.create(menu);
    entity.setUpdateBy(getOperator(this.ctx))
    await this.menuModel.save(entity);
    return resBuild.success();
  }

  //获取菜单详情
  async detail(menuId: number) {
    const menu = await this.menuModel.findOneBy({
      menuId,
    });
    return resBuild.data(menu);
  }

  //树状结构
  async treeSelect() {
    const rows = await this.menuModel.find({
      select: ['menuId', 'menuName', 'parentId'],
      order: {
        orderNum: 'ASC',
        createTime: 'DESC'
      }
    })
    const arr2 = listToTree(rows, 'menuId', 'menuName')
    return resBuild.data(arr2)
  }
  // 角色弹框使用，根据角色id获取菜单树状结构
  async getTreeSelectByRoleId(roleId: number) {
    // 获取处理过的菜单树状结构，就是上面的
    const { data } = await this.treeSelect();
    const selectedMenuIds = await this.roleMenuModel.find({
      select: ['menuId'],
      where: {
        roleId,
      }
    })
    return resBuild.data({
      menus: data,
      checkedKeys: selectedMenuIds.map(item => item.menuId)
    })
  }
  // 获取子菜单
  async getChildMenus(parentId: number, menuName: string, perms: string) {
    const fun = {
      "查询": "query",
      "新增": "add",
      "修改": "edit",
      "删除": "remove",
      "导出": "export"
    }
    let orderNum = 0;
    for (const key in fun) {
      const childMenu = this.menuModel.create({
        menuName: `${menuName}${key}`,
        parentId,
        menuType: 'F',
        orderNum: orderNum++,
        status: '0',
        perms: `${perms.split('list')[0]}${fun[key]}`,
        createBy: getOperator(this.ctx),
        updateBy: getOperator(this.ctx),
        createTime: new Date(),
        updateTime: new Date(),
      });
      await this.menuModel.save(childMenu);
    }
  }
}

import { Controller,Inject,Get,  Body,Post,Del,Param, Put, Query } from "@midwayjs/core";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@midwayjs/swagger';
import { MenuService } from '../../service/system/menu.service';
import { Context } from "vm";
import { Auth } from "../../decorator/auth.decorator";
import { ListMenuDTO, CreateMenuDTO, UpdateMenuDTO } from "@dto/system/menuDto";
import { BusinessType } from "@utils/enum";
import { Log } from "@decorator/log.decorator";

@ApiTags('菜单管理')
@Controller('/system/menu')
export class MenuController{
  @Inject()
  MenuService:MenuService;
  @Inject()
  ctx:Context;

  /**
   * @GET /system/menu/getMenuList
   * @param queryParams
   * @returns
   */
  @ApiOperation({ summary: '获取菜单列表', description: '获取系统菜单列表' })
  @ApiQuery({ type: ListMenuDTO, description: '查询参数' })
  @ApiResponse({ status: 200, description: '成功获取菜单列表' })
  @Auth('system:menu:list')
  @Get('/list')
  async getMenuList(@Query() queryParams:ListMenuDTO){
      return await this.MenuService.getMenuList(queryParams)
  }

  /**
   * @Post /system/menu
   * @param addMenu
   * @returns {Object}
   */
  @ApiOperation({ summary: '新增菜单', description: '创建新的菜单' })
  @ApiBody({ type: CreateMenuDTO, description: '菜单信息' })
  @ApiResponse({ status: 200, description: '成功创建菜单' })
  @Auth('system:menu:add')
  @Log({ title: '菜单管理', businessType: BusinessType.ADD })
  @Post('/')
  async addMenu(@Body() addMenu:CreateMenuDTO){
    return await this.MenuService.addMenu(addMenu);
  }


  // 删除
  @ApiOperation({ summary: '删除菜单', description: '根据ID删除菜单' })
  @ApiParam({ name: 'menuId', description: '菜单ID' })
  @ApiResponse({ status: 200, description: '成功删除菜单' })
  @Auth('system:menu:remove')
  @Log({ title: '菜单管理', businessType: BusinessType.REMOVE })
  @Del('/:menuId')
  async delMenu(@Param('menuId') menuId:string){
    return await this.MenuService.delMenu(menuId);
  }
 // 修改
  @ApiOperation({ summary: '修改菜单', description: '更新菜单信息' })
  @ApiBody({ type: UpdateMenuDTO, description: '菜单信息' })
  @ApiResponse({ status: 200, description: '成功修改菜单' })
  @Auth('system:menu:edit')
  @Log({ title: '菜单管理', businessType: BusinessType.EDIT })
  @Put('/')
  async update(@Body() menu: UpdateMenuDTO) {
    return await this.MenuService.update(menu);
  }

  // 获取详情
  @ApiOperation({ summary: '获取菜单详情', description: '根据ID获取菜单详细信息' })
  @ApiParam({ name: 'menuId', description: '菜单ID' })
  @ApiResponse({ status: 200, description: '成功获取菜单详情' })
  @Auth('system:menu:query')
  @Get('/:menuId')
  async get(@Param('menuId') menuId: number) {
    return await this.MenuService.detail(menuId);
  }

  // 获取菜单下拉树列表
  @ApiOperation({ summary: '获取菜单下拉树列表', description: '获取菜单树形结构列表' })
  @ApiResponse({ status: 200, description: '成功获取菜单下拉树列表' })
  @Get('/treeselect')
  async treeSelect() {
    return await this.MenuService.treeSelect();
  }

  // 根据角色ID查询菜单下拉树结构
  @ApiOperation({ summary: '根据角色ID查询菜单下拉树结构', description: '获取指定角色的菜单树形结构' })
  @ApiParam({ name: 'roleId', description: '角色ID' })
  @ApiResponse({ status: 200, description: '成功获取角色菜单下拉树结构' })
  @Get('/roleMenuTreeselect/:roleId')
  async roleMenuTreeSelect(@Param('roleId') roleId: number) {
    return await this.MenuService.getTreeSelectByRoleId(roleId);
  }



}

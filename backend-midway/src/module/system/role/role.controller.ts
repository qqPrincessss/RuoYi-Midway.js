import { Controller ,Inject, Get, Body,Post,Put, Query, Del, Param } from "@midwayjs/core";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@midwayjs/swagger';
import { RoleService } from "../../service/system/role.service";
import { ChangeStatusDto, ListRoleDTO, CreateRoleDTO, UpdateRoleDTO, ListAuthUserDTO, CancelAuthUserDTO, BatchCancelAuthUserDTO, BatchBindAuthUserDTO } from "@dto/system/roleDto";
import { Auth } from "@decorator/auth.decorator";
import { BusinessType, Log } from "@decorator/log.decorator";

@ApiTags('角色管理')
@Controller('/system/role')
export class RoleController{
  @Inject()
  roleService:RoleService;

  @ApiOperation({ summary: '获取角色列表', description: '获取系统角色列表' })
  @ApiQuery({ type: ListRoleDTO, description: '查询参数' })
  @ApiResponse({ status: 200, description: '成功获取角色列表' })
  @Auth('system:role:list')
  @Get('/list')
  async getRoleList(@Query() queryParams: ListRoleDTO){
      return await this.roleService.getRoleList(queryParams) 
  }

  // 新增
  @ApiOperation({ summary: '新增角色', description: '创建新的角色' })
  @ApiBody({ type: CreateRoleDTO, description: '角色信息' })
  @ApiResponse({ status: 200, description: '成功创建角色' })
  @Auth('system:role:add')
  @Log({ title: '角色管理', businessType: BusinessType.ADD })
  @Post('/')
  async addRole(@Body() role:CreateRoleDTO){
      return await this.roleService.addRole(role)
  }
  // 删除
  @ApiOperation({ summary: '删除角色', description: '根据ID删除角色' })
  @ApiParam({ name: 'roleId', description: '角色ID' })
  @ApiResponse({ status: 200, description: '成功删除角色' })
  @Auth('system:role:remove')
  @Log({ title: '角色管理', businessType: BusinessType.REMOVE })
  @Del('/:roleId')
  async delete(@Param('roleId') roleId: string) {
    return await this.roleService.delete(roleId);
  }
  // 修改
  @ApiOperation({ summary: '修改角色', description: '更新角色信息' })
  @ApiBody({ type: UpdateRoleDTO, description: '角色信息' })
  @ApiResponse({ status: 200, description: '成功修改角色' })
  @Auth('system:role:edit')
  @Log({ title: '角色管理', businessType: BusinessType.EDIT })
  @Put('/')
  async update(@Body() role:UpdateRoleDTO){
      return await this.roleService.update(role)
  }
    // 获取详情
  @ApiOperation({ summary: '获取角色详情', description: '根据ID获取角色详细信息' })
  @ApiParam({ name: 'roleId', description: '角色ID' })
  @ApiResponse({ status: 200, description: '成功获取角色详情' })
  @Auth('system:role:query')
  @Get('/:roleId')
  async get(@Param('roleId') roleId: number) {
    return await this.roleService.detail(roleId);
  }

  // 已分配角色的用户列表
  @ApiOperation({ summary: '获取已分配角色的用户列表', description: '获取已分配指定角色的用户列表' })
  @ApiQuery({ type: ListAuthUserDTO, description: '查询参数' })
  @ApiResponse({ status: 200, description: '成功获取已分配角色的用户列表' })
  @Get('/authUser/allocatedList')
  async allocatedList(@Query() queryParams: ListAuthUserDTO) {
    return await this.roleService.allocatedUserList(queryParams);
  }

  // 未分配角色的用户列表
  @ApiOperation({ summary: '获取未分配角色的用户列表', description: '获取未分配指定角色的用户列表' })
  @ApiQuery({ type: ListAuthUserDTO, description: '查询参数' })
  @ApiResponse({ status: 200, description: '成功获取未分配角色的用户列表' })
  @Get('/authUser/unallocatedList')
  async unallocatedList(@Query() queryParams: ListAuthUserDTO) {
    return await this.roleService.unallocatedUserList(queryParams);
  }

  // 解绑角色用户
  @ApiOperation({ summary: '解绑角色用户', description: '解除用户与角色的绑定关系' })
  @ApiBody({ type: CancelAuthUserDTO, description: '解绑参数' })
  @ApiResponse({ status: 200, description: '成功解绑角色用户' })
  @Auth('system:role:edit')
  @Put('/authUser/cancel')
  async cancelAuthUser(@Body() params: CancelAuthUserDTO) {
    return await this.roleService.cancelAuthUser(params);
  }

  // 批量解绑角色用户
  @ApiOperation({ summary: '批量解绑角色用户', description: '批量解除用户与角色的绑定关系' })
  @ApiBody({ type: BatchCancelAuthUserDTO, description: '批量解绑参数' })
  @ApiResponse({ status: 200, description: '成功批量解绑角色用户' })
  @Auth('system:role:edit')
  @Put('/authUser/cancelAll')
  async batchCancelAuthUser(@Body() params: BatchCancelAuthUserDTO) {
    return await this.roleService.batchCancelAuthUser(params);
  }

  // 批量绑定角色用户
  @ApiOperation({ summary: '批量绑定角色用户', description: '批量绑定用户与角色的关系' })
  @ApiBody({ type: BatchBindAuthUserDTO, description: '批量绑定参数' })
  @ApiResponse({ status: 200, description: '成功批量绑定角色用户' })
  @Auth('system:role:edit')
  @Put('/authUser/allocateAll')
  async batchBindAuthUser(@Body() params: BatchBindAuthUserDTO) {
    return await this.roleService.batchBindAuthUser(params);
  }
  // 列表页 - 修改用户状态
  @ApiOperation({ summary: '修改角色状态', description: '修改角色的启用/禁用状态' })
  @ApiBody({ type: ChangeStatusDto, description: '状态修改参数' })
  @ApiResponse({ status: 200, description: '成功修改角色状态' })
  @Put('/changeStatus')
  async changeStatus(@Body() body: ChangeStatusDto) {
    return await this.roleService.changeStatus(body);
  }
}

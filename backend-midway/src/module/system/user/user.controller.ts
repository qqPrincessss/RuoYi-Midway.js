import { Inject, Controller, Body, Post, Get, Query, Put, Files, Param, Del, createMiddleware } from "@midwayjs/core";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@midwayjs/swagger';
import { AuthService } from "../../service/auth/auth.service";
import { UserService } from "../../service/system/user.service";
import { ListUserDTO, CreateUserDTO, UpdateUserDTO, UpdatePwdDto, ResetPwdDto, ChangeStatusDto, UpdateProfileDto, UpdateAuthRoleDTO } from "@dto/system/userDto";
import { Auth } from "@decorator/auth.decorator";
import { BusinessType } from "@utils/enum";
import { Log } from "@decorator/log.decorator";
import { UploadFileInfo, UploadMiddleware, UploadStreamFileInfo } from "@midwayjs/busboy";
import { DeptService } from "@service/system/dept.service";

@ApiTags('用户管理')
@Controller('/system/user')
export class UserController {
  @Inject()
  authService: AuthService;

  @Inject()
  userService: UserService;
  @Inject()
  deptService: DeptService;


  /**
   * 获取用户列表
   * @GET /system/user/list
   */
  @ApiOperation({ summary: '获取用户列表', description: '获取系统用户列表' })
  @ApiQuery({ type: ListUserDTO, description: '查询参数' })
  @ApiResponse({ status: 200, description: '成功获取用户列表' })
  @Auth('system:user:list') 
  @Get('/list')
  async getList(@Query() queryParams: ListUserDTO): Promise<object> {
    return await this.userService.userList(queryParams)
  }

  // 新增
  @ApiOperation({ summary: '新增用户', description: '创建新的用户' })
  @ApiBody({ type: CreateUserDTO, description: '用户信息' })
  @ApiResponse({ status: 200, description: '成功创建用户' })
  @Auth('system:user:add')
  @Log({ title: '用户管理', businessType: BusinessType.ADD })
  @Post('/')
  async addUser(@Body() User: CreateUserDTO): Promise<object> {
    return await this.userService.create(User);
  }
    // 删除，此接口仅解析数字类型，如果为其他值，不走此接口
  @ApiOperation({ summary: '删除用户', description: '根据ID删除用户' })
  @ApiParam({ name: 'userId', description: '用户ID', required: false })
  @ApiResponse({ status: 200, description: '成功删除用户' })
  @Auth('system:user:remove')
  @Log({ title: '用户管理', businessType: BusinessType.REMOVE })
  @Del('/:userId?')
  async delete(@Param('userId') userId: string) {
    return await this.userService.delete(userId);
  }

  // 修改
  @ApiOperation({ summary: '修改用户', description: '更新用户信息' })
  @ApiBody({ type: UpdateUserDTO, description: '用户信息' })
  @ApiResponse({ status: 200, description: '成功修改用户' })
  @Auth('system:user:edit')
  @Log({ title: '用户管理', businessType: BusinessType.EDIT })
  @Put('/')
  async update(@Body() user: UpdateUserDTO) {
    return await this.userService.update(user);
  }

  // 获取详情 userId非必填，因为新增时会调用无参的该接口
  @ApiOperation({ summary: '获取用户详情', description: '根据ID获取用户详细信息' })
  @ApiParam({ name: 'userId', description: '用户ID', required: false })
  @ApiResponse({ status: 200, description: '成功获取用户详情' })
  @Auth('system:user:query')
  @Get('/:userId?')
  async get(@Param('userId') userId: number | undefined) {
    return await this.userService.detail(userId);
  }

  // 导出
  @ApiOperation({ summary: '导出用户数据', description: '导出用户数据到Excel文件' })
  @ApiBody({ type: ListUserDTO, description: '导出条件' })
  @ApiResponse({ status: 200, description: '成功导出用户数据' })
  @Auth('system:user:export')
  @Log({ title: '用户管理', businessType: BusinessType.EXPORT })
  @Post('/export')
  async export(@Body() queryParams: ListUserDTO) {
    return await this.userService.export(queryParams);
  }

  // 下载导入模板
  @ApiOperation({ summary: '下载导入模板', description: '下载用户导入Excel模板' })
  @ApiResponse({ status: 200, description: '成功下载导入模板' })
  @Post('/importTemplate')
  async importTemplate() {
    return await this.userService.importTemplate();
  }

  // 导入模板
  @ApiOperation({ summary: '导入用户数据', description: '从Excel文件导入用户数据' })
  @ApiQuery({ name: 'updateSupport', description: '是否支持更新已存在的用户', type: Boolean })
  @ApiResponse({ status: 200, description: '成功导入用户数据' })
  @Auth('system:user:import')
  @Log({ title: '用户管理', businessType: BusinessType.IMPORT })
  @Post('/importData', {
    middleware: [ createMiddleware(UploadMiddleware, { mode: 'stream' }) ]
  })
  async importData(
    @Files() files: UploadStreamFileInfo,
    @Query('updateSupport') updateSupport: boolean
  ) {
    return await this.userService.importData({
      files,
      updateSupport
    });
  }

  // 部门树状结构
  @ApiOperation({ summary: '获取部门树', description: '获取部门树状结构' })
  @ApiResponse({ status: 200, description: '成功获取部门树' })
  @Get('/deptTree')
  async deptTree() {
    return await this.deptService.deptTree();
  }

  // 列表页 -  重置密码
  @ApiOperation({ summary: '重置用户密码', description: '重置指定用户的密码' })
  @ApiBody({ type: ResetPwdDto, description: '重置密码参数' })
  @ApiResponse({ status: 200, description: '成功重置密码' })
  @Auth('system:user:resetPwd')
  @Log({ title: '用户管理', businessType: BusinessType.EDIT })
  @Put('/resetPwd')
  async resetPwd(@Body() body: ResetPwdDto) {
    return await this.userService.resetPsw(body);
  }

  // 列表页 - 修改用户状态
  @ApiOperation({ summary: '修改用户状态', description: '修改用户的启用/禁用状态' })
  @ApiBody({ type: ChangeStatusDto, description: '状态修改参数' })
  @ApiResponse({ status: 200, description: '成功修改用户状态' })
  @Log({ title: '个人信息', businessType: BusinessType.EDIT })
  @Put('/changeStatus')
  async changeStatus(@Body() body: ChangeStatusDto) {
    return await this.userService.changeStatus(body);
  }

  // 获取用户授权角色
  @ApiOperation({ summary: '获取用户授权角色', description: '获取指定用户的授权角色信息' })
  @ApiParam({ name: 'userId', description: '用户ID' })
  @ApiResponse({ status: 200, description: '成功获取用户授权角色' })
  @Get('/authRole/:userId')
  async authRoleList(@Param('userId') userId: number) {
    return await this.userService.authRoleList(userId);
  }

  // 用户授权角色
  @ApiOperation({ summary: '更新用户授权角色', description: '更新指定用户的授权角色' })
  @ApiQuery({ type: UpdateAuthRoleDTO, description: '授权角色参数' })
  @ApiResponse({ status: 200, description: '成功更新用户授权角色' })
  @Put('/authRole')
  async authRoleUpdate(@Query() body: UpdateAuthRoleDTO) {
    return await this.userService.authRoleUpdate(body);
  }

  // 个人信息
  @ApiOperation({ summary: '获取个人信息', description: '获取当前登录用户的个人信息' })
  @ApiResponse({ status: 200, description: '成功获取个人信息' })
  @Get('/profile')
  async profile() {
    return await this.userService.profile();
  }
  @ApiOperation({ summary: '获取可选教师列表', description: '获取当前登录用户的教师列表' })
  @ApiResponse({ status: 200, description: '成功获取教师列表' })
  @Get('/teacherList')
  async teacherList() {
    return await this.userService.teacherList();
  }
  // 修改个人信息
  @ApiOperation({ summary: '修改个人信息', description: '修改当前登录用户的个人信息' })
  @ApiBody({ type: UpdateProfileDto, description: '个人信息' })
  @ApiResponse({ status: 200, description: '成功修改个人信息' })
  @Log({ title: '个人信息', businessType: BusinessType.EDIT })
  @Put('/profile')
  async updateProfile(@Body() body: UpdateProfileDto) {
    return await this.userService.updateProfile(body);
  }

  // 修改密码
  @ApiOperation({ summary: '修改密码', description: '修改当前登录用户的密码' })
  @ApiBody({ type: UpdatePwdDto, description: '密码修改参数' })
  @ApiResponse({ status: 200, description: '成功修改密码' })
  @Log({ title: '个人信息', businessType: BusinessType.EDIT })
  @Put('/profile/updatePwd')
  async updatePwd(@Body() updatePwd: UpdatePwdDto) {
    return await this.userService.updatePwd(updatePwd);
  }

  // 头像上传
  @ApiOperation({ summary: '上传头像', description: '上传用户头像' })
  @ApiResponse({ status: 200, description: '成功上传头像' })
  @Log({ title: '个人信息', businessType: BusinessType.EDIT })
  @Post('/profile/avatar', { middleware: [UploadMiddleware] })
  async profileAvatar(@Files() files: UploadFileInfo) {
    return await this.userService.profileAvatar(files);
  }
}

import { Controller, Inject, Get, Query, Param, Del, Post } from '@midwayjs/core';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@midwayjs/swagger';
import { LoginInforService } from "@service/monitor/loginInfor.service";
import { ListLoginInforDTO } from "@dto/monitor/loginInfor.dto";
import { Auth } from "@decorator/auth.decorator";
import { BusinessType, Log } from "@decorator/log.decorator";

@ApiTags('登录信息')
@Controller('/monitor/logininfor')
export class LoginInforController {
  @Inject()
  loginInforService: LoginInforService;

  // 获取列表
  @ApiOperation({ summary: '获取登录信息列表', description: '获取系统登录信息列表' })
  @ApiQuery({ type: ListLoginInforDTO, description: '查询参数' })
  @ApiResponse({ status: 200, description: '成功获取登录信息列表' })
  @Auth('monitor:logininfor:list')
  @Get('/list')
  async list(@Query() queryParams: ListLoginInforDTO) {
    return await this.loginInforService.list(queryParams);
  }

  // 删除
  @ApiOperation({ summary: '删除登录信息', description: '根据ID删除登录信息' })
  @ApiParam({ name: 'infoId', description: '登录信息ID' })
  @ApiResponse({ status: 200, description: '成功删除登录信息' })
  @Auth('monitor:logininfor:remove')
  @Log({ title: '登录信息', businessType: BusinessType.REMOVE })
  @Del('/:infoId')
  async delete(@Param('infoId') infoId: string) {
    return await this.loginInforService.delete(infoId);
  }

  // 导出
  @ApiOperation({ summary: '导出登录信息', description: '导出登录信息数据' })
  @ApiQuery({ type: ListLoginInforDTO, description: '查询参数' })
  @ApiResponse({ status: 200, description: '成功导出登录信息' })
  @Auth('monitor:logininfor:export')
  @Log({ title: '登录信息', businessType: BusinessType.EXPORT })
  @Post('/export')
  async export(@Query() queryParams: ListLoginInforDTO) {
    return await this.loginInforService.export(queryParams);
  }

  // 清空
  @ApiOperation({ summary: '清空登录信息', description: '清空所有登录信息记录' })
  @ApiResponse({ status: 200, description: '成功清空登录信息' })
  @Auth('monitor:logininfor:remove')
  @Log({ title: '登录信息', businessType: BusinessType.CLEAR })
  @Del('/clean')
  async clean() {
    return await this.loginInforService.clean();
  }

  // 解锁用户
  @ApiOperation({ summary: '解锁用户', description: '解锁被锁定的用户账号' })
  @ApiParam({ name: 'userName', description: '用户名' })
  @ApiResponse({ status: 200, description: '成功解锁用户' })
  @Auth('monitor:logininfor:unlock')
  @Get('/unlock/:userName')
  async unlock(@Param('userName') userName: string) {
    return await this.loginInforService.unlock(userName);
  }
}

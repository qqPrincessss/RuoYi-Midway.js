import { Controller, Inject, Get, Query, Del, Param } from '@midwayjs/core';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@midwayjs/swagger';
import { OnlineService } from "@service/monitor/online.service";
import { ListOnlineDTO } from "@dto/monitor/online.dto";
import { Auth } from "@decorator/auth.decorator";

@ApiTags('在线用户')
@Controller('/monitor/online')
export class OnlineController {
  @Inject()
  onlineService: OnlineService;

  // 获取列表
  @ApiOperation({ summary: '获取在线用户列表', description: '获取当前在线用户列表' })
  @ApiQuery({ type: ListOnlineDTO, description: '查询参数' })
  @ApiResponse({ status: 200, description: '成功获取在线用户列表' })
  @Auth('monitor:online:list')
  @Get('/list')
  async list(@Query() queryParams: ListOnlineDTO) {
    return await this.onlineService.list(queryParams);
  }

  // 强制下线
  @ApiOperation({ summary: '强制用户下线', description: '根据token强制用户下线' })
  @ApiParam({ name: 'tokenId', description: '用户token ID' })
  @ApiResponse({ status: 200, description: '成功强制用户下线' })
  @Auth('monitor:online:forceLogout')
  @Del('/:tokenId')
  async delete(@Param('tokenId') tokenId: string) {
    return await this.onlineService.delete(tokenId);
  }
}

import { Controller, Inject, Get} from '@midwayjs/core';
import { ApiTags, ApiOperation, ApiResponse } from '@midwayjs/swagger';
import { ServerService } from "./server.service";

@ApiTags('服务监控')
@Controller('/monitor/server')
export class serverController {
  @Inject()
  serverService: ServerService

  // 获取列表
  @ApiOperation({ summary: '获取服务信息', description: '获取系统服务监控信息' })
  @ApiResponse({ status: 200, description: '成功获取服务信息' })
  @Get()
  async get() {
    return await this.serverService.get();
  }
}

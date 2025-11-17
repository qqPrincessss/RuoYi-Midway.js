import { Controller, Inject, Get, Query, Param, Del, Post } from '@midwayjs/core';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@midwayjs/swagger';
import { OperLogService } from "@service/monitor/operLog.service";
import { ListOperLogDTO } from "@dto/monitor/operLog.dto";
import { Auth } from "@decorator/auth.decorator";
import { BusinessType, Log } from "@decorator/log.decorator";

@ApiTags('操作日志')
@Controller('/monitor/operlog')
export class OperLogController {
  @Inject()
  operLogService: OperLogService;

  // 获取列表
  @ApiOperation({ summary: '获取操作日志列表', description: '获取系统操作日志列表' })
  @ApiQuery({ type: ListOperLogDTO, description: '查询参数' })
  @ApiResponse({ status: 200, description: '成功获取操作日志列表' })
  @Auth('monitor:operlog:list')
  @Get('/list')
  async list(@Query() queryParams: ListOperLogDTO) {
    return await this.operLogService.list(queryParams);
  }

  // 删除
  @ApiOperation({ summary: '删除操作日志', description: '根据ID删除操作日志' })
  @ApiParam({ name: 'operId', description: '操作日志ID' })
  @ApiResponse({ status: 200, description: '成功删除操作日志' })
  @Auth('monitor:operlog:remove')
  @Log({ title: '操作日志', businessType: BusinessType.REMOVE })
  @Del('/:operId')
  async delete(@Param('operId') operId: string) {
    return await this.operLogService.delete(operId);
  }

  // 获取详情
  @ApiOperation({ summary: '获取操作日志详情', description: '根据ID获取操作日志详细信息' })
  @ApiParam({ name: 'operId', description: '操作日志ID' })
  @ApiResponse({ status: 200, description: '成功获取操作日志详情' })
  @Auth('monitor:operlog:query')
  @Get('/:operId')
  async get(@Param('operId') operId: number) {
    return await this.operLogService.detail(operId);
  }

  // 导出
  @ApiOperation({ summary: '导出操作日志', description: '导出操作日志数据' })
  @ApiQuery({ type: ListOperLogDTO, description: '查询参数' })
  @ApiResponse({ status: 200, description: '成功导出操作日志' })
  @Auth('monitor:operlog:export')
  @Log({ title: '操作日志', businessType: BusinessType.EXPORT })
  @Post('/export')
  async export(@Query() queryParams: ListOperLogDTO) {
    return await this.operLogService.export(queryParams);
  }

  // 清空所有数据
  @ApiOperation({ summary: '清空操作日志', description: '清空所有操作日志记录' })
  @ApiResponse({ status: 200, description: '成功清空操作日志' })
  @Auth('monitor:operlog:remove')
  @Log({ title: '操作日志', businessType: BusinessType.CLEAR })
  @Del('/clean')
  async clean() {
    return await this.operLogService.clean();
  }
}

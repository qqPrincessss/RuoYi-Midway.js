import { Controller, Inject, Get, Query, Post, Param, Del } from '@midwayjs/core';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@midwayjs/swagger';
import { JobLogService } from "@service/monitor/jobLog.service";
import { ListJobLogDTO } from "@dto/monitor/jobLog.dto";
import { Auth } from "@decorator/auth.decorator";
import { BusinessType, Log } from "@decorator/log.decorator";

@ApiTags('定时任务日志')
@Controller('/monitor/jobLog')
export class JobLogController {
  @Inject()
  jobLogService: JobLogService;

  // 获取列表
  @ApiOperation({ summary: '获取定时任务日志列表', description: '获取定时任务执行日志列表' })
  @ApiQuery({ type: ListJobLogDTO, description: '查询参数' })
  @ApiResponse({ status: 200, description: '成功获取定时任务日志列表' })
  @Auth('monitor:job:list')
  @Get('/list')
  async list(@Query() queryParams: ListJobLogDTO) {
    return await this.jobLogService.list(queryParams);
  }

  // 删除
  @ApiOperation({ summary: '删除定时任务日志', description: '根据ID删除定时任务日志' })
  @ApiParam({ name: 'jobLogId', description: '定时任务日志ID' })
  @ApiResponse({ status: 200, description: '成功删除定时任务日志' })
  @Auth('monitor:job:remove')
  @Log({ title: '定时任务日志', businessType: BusinessType.REMOVE })
  @Del('/:jobLogId')
  async delete(@Param('jobLogId') jobLogId: string) {
    return await this.jobLogService.delete(jobLogId);
  }

  // 获取详情
  @ApiOperation({ summary: '获取定时任务日志详情', description: '根据ID获取定时任务日志详细信息' })
  @ApiParam({ name: 'jobLogId', description: '定时任务日志ID' })
  @ApiResponse({ status: 200, description: '成功获取定时任务日志详情' })
  @Auth('monitor:job:query')
  @Get('/:jobLogId')
  async get(@Param('jobLogId') jobLogId: number) {
    return await this.jobLogService.detail(jobLogId);
  }

  // 导出
  @ApiOperation({ summary: '导出定时任务日志', description: '导出定时任务日志数据' })
  @ApiQuery({ type: ListJobLogDTO, description: '查询参数' })
  @ApiResponse({ status: 200, description: '成功导出定时任务日志' })
  @Auth('monitor:job:export')
  @Log({ title: '定时任务日志', businessType: BusinessType.EXPORT })
  @Post('/export')
  async export(@Query() queryParams: ListJobLogDTO) {
    return await this.jobLogService.export(queryParams);
  }
}

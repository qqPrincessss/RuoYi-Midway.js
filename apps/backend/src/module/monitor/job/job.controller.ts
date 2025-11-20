import { Controller, Inject, Get, Query, Body, Post, Put, Param, Del } from '@midwayjs/core';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@midwayjs/swagger';
import { JobService } from "./job.service";
import { ListJobDTO, CreateJobDTO, UpdateJobDTO, ChangeStatusDto, RunJobDto } from "./dto/job.dto";
import { Auth } from "@decorator/auth.decorator";
import { BusinessType, Log } from "@decorator/log.decorator";

@ApiTags('定时任务')
@Controller('/monitor/job')
export class JobController {
  @Inject()
  jobService: JobService;

  // 获取列表
  @ApiOperation({ summary: '获取定时任务列表', description: '获取定时任务列表信息' })
  @ApiQuery({ type: ListJobDTO, description: '查询参数' })
  @ApiResponse({ status: 200, description: '成功获取定时任务列表' })
  @Auth('monitor:job:list')
  @Get('/list')
  async list(@Query() queryParams: ListJobDTO) {
    return await this.jobService.list(queryParams);
  }

  // 新增
  @ApiOperation({ summary: '新增定时任务', description: '创建新的定时任务' })
  @ApiBody({ type: CreateJobDTO, description: '定时任务信息' })
  @ApiResponse({ status: 200, description: '成功创建定时任务' })
  @Auth('monitor:job:add')
  @Log({ title: '定时任务', businessType: BusinessType.ADD })
  @Post('/')
  async create(@Body() job: CreateJobDTO) {
    return await this.jobService.create(job);
  }

  // 删除
  @ApiOperation({ summary: '删除定时任务', description: '根据ID删除定时任务' })
  @ApiParam({ name: 'jobId', description: '定时任务ID' })
  @ApiResponse({ status: 200, description: '成功删除定时任务' })
  @Auth('monitor:job:remove')
  @Log({ title: '定时任务', businessType: BusinessType.REMOVE })
  @Del('/:jobId')
  async delete(@Param('jobId') jobId: string) {
    return await this.jobService.delete(jobId);
  }

  // 修改
  @ApiOperation({ summary: '修改定时任务', description: '更新定时任务信息' })
  @ApiBody({ type: UpdateJobDTO, description: '定时任务信息' })
  @ApiResponse({ status: 200, description: '成功修改定时任务' })
  @Auth('monitor:job:edit')
  @Log({ title: '定时任务', businessType: BusinessType.EDIT })
  @Put('/')
  async update(@Body() job: UpdateJobDTO) {
    return await this.jobService.update(job);
  }

  // 获取详情
  @ApiOperation({ summary: '获取定时任务详情', description: '根据ID获取定时任务详细信息' })
  @ApiParam({ name: 'jobId', description: '定时任务ID' })
  @ApiResponse({ status: 200, description: '成功获取定时任务详情' })
  @Auth('monitor:job:query')
  @Get('/:jobId')
  async get(@Param('jobId') jobId: number) {
    return await this.jobService.detail(jobId);
  }

  // 导出
  @ApiOperation({ summary: '导出定时任务', description: '导出定时任务数据' })
  @ApiQuery({ type: ListJobDTO, description: '查询参数' })
  @ApiResponse({ status: 200, description: '成功导出定时任务' })
  @Auth('monitor:job:export')
  @Log({ title: '定时任务', businessType: BusinessType.EXPORT })
  @Post('/export')
  async export(@Query() queryParams: ListJobDTO) {
    return await this.jobService.export(queryParams);
  }

  // 修改状态
  @ApiOperation({ summary: '修改定时任务状态', description: '启用或禁用定时任务' })
  @ApiBody({ type: ChangeStatusDto, description: '状态信息' })
  @ApiResponse({ status: 200, description: '成功修改定时任务状态' })
  @Auth('monitor:job:edit')
  @Log({ title: '定时任务', businessType: BusinessType.EDIT })
  @Put('/changeStatus')
  async changeStatus(@Body() body: ChangeStatusDto) {
    return await this.jobService.changeStatus(body);
  }

  // 立即执行
  @ApiOperation({ summary: '立即执行定时任务', description: '手动触发定时任务执行' })
  @ApiBody({ type: RunJobDto, description: '执行参数' })
  @ApiResponse({ status: 200, description: '成功执行定时任务' })
  @Auth('monitor:job:add')
  @Put('/run')
  async run(@Body() body: RunJobDto) {
    return await this.jobService.run(body);
  }
}

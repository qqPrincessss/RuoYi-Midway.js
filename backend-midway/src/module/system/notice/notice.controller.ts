import { Controller, Inject, Get, Query, Body, Post, Put, Param, Del } from '@midwayjs/core';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@midwayjs/swagger';
import { NoticeService } from "./notice.service";
import { ListNoticeDTO, CreateNoticeDTO, UpdateNoticeDTO } from "./dto/notice.dto";
import { Auth } from "@decorator/auth.decorator";
import { BusinessType, Log } from "@decorator/log.decorator";

@ApiTags('通知公告')
@Controller('/system/notice')
export class NoticeController {
  @Inject()
  noticeService: NoticeService;

  // 获取列表
  @ApiOperation({ summary: '获取通知公告列表', description: '获取系统通知公告列表' })
  @ApiQuery({ type: ListNoticeDTO, description: '查询参数' })
  @ApiResponse({ status: 200, description: '成功获取通知公告列表' })
  @Get('/list')
  async list(@Query() queryParams: ListNoticeDTO) {
    return await this.noticeService.list(queryParams);
  }

  // 新增
  @ApiOperation({ summary: '新增通知公告', description: '创建新的通知公告' })
  @ApiBody({ type: CreateNoticeDTO, description: '通知公告信息' })
  @ApiResponse({ status: 200, description: '成功创建通知公告' })
  @Auth('system:notice:add')
  @Log({ title: '通知公告', businessType: BusinessType.ADD })
  @Post('/')
  async create(@Body() notice: CreateNoticeDTO) {
    return await this.noticeService.create(notice);
  }

  // 删除
  @ApiOperation({ summary: '删除通知公告', description: '根据ID删除通知公告' })
  @ApiParam({ name: 'noticeId', description: '通知公告ID' })
  @ApiResponse({ status: 200, description: '成功删除通知公告' })
  @Auth('system:notice:remove')
  @Log({ title: '通知公告', businessType: BusinessType.REMOVE })
  @Del('/:noticeId')
  async delete(@Param('noticeId') noticeId: string) {
    return await this.noticeService.delete(noticeId);
  }

  // 修改
  @ApiOperation({ summary: '修改通知公告', description: '更新通知公告信息' })
  @ApiBody({ type: UpdateNoticeDTO, description: '通知公告信息' })
  @ApiResponse({ status: 200, description: '成功修改通知公告' })
  @Auth('system:notice:edit')
  @Log({ title: '通知公告', businessType: BusinessType.EDIT })
  @Put('/')
  async update(@Body() notice: UpdateNoticeDTO) {
    return await this.noticeService.update(notice);
  }

  // 获取详情
  @ApiOperation({ summary: '获取通知公告详情', description: '根据ID获取通知公告详细信息' })
  @ApiParam({ name: 'noticeId', description: '通知公告ID' })
  @ApiResponse({ status: 200, description: '成功获取通知公告详情' })
  @Auth('system:notice:query')
  @Get('/:noticeId')
  async get(@Param('noticeId') noticeId: number) {
    return await this.noticeService.detail(noticeId);
  }
  // 获取详情
  @ApiOperation({ summary: '获取通知公告详情', description: '根据ID获取通知公告详细信息' })
  @ApiParam({ name: 'noticeId', description: '通知公告ID' })
  @ApiResponse({ status: 200, description: '成功获取通知公告详情' })
  @Get('/home')
  async getHome() {
    return await this.noticeService.detail(11);
  }
}

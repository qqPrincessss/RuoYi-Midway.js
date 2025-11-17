import { Controller, Inject, Get, Query, Body, Post, Put, Param, Del } from '@midwayjs/core';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@midwayjs/swagger';
import { PostService } from "./post.service";
import { ListPostDTO, CreatePostDTO, UpdatePostDTO } from "./dto/post.dto";
import { Auth } from "@decorator/auth.decorator";
import { Log, BusinessType } from "@decorator/log.decorator";

@ApiTags('岗位管理')
@Controller('/system/post')
export class PostController {
  @Inject()
  postService: PostService;

  // 获取列表
  @ApiOperation({ summary: '获取岗位列表', description: '获取系统岗位列表' })
  @ApiQuery({ type: ListPostDTO, description: '查询参数' })
  @ApiResponse({ status: 200, description: '成功获取岗位列表' })
  @Auth('system:post:list')
  @Get('/list')
  async list(@Query() queryParams: ListPostDTO) {
    return await this.postService.list(queryParams);
  }

  // 新增
  @ApiOperation({ summary: '新增岗位', description: '创建新的岗位' })
  @ApiBody({ type: CreatePostDTO, description: '岗位信息' })
  @ApiResponse({ status: 200, description: '成功创建岗位' })
  @Auth('system:post:add')
  @Log({ title: '岗位管理', businessType: BusinessType.ADD })
  @Post('/')
  async create(@Body() post: CreatePostDTO) {
    return await this.postService.create(post);
  }

  // 删除
  @ApiOperation({ summary: '删除岗位', description: '根据ID删除岗位' })
  @ApiParam({ name: 'postId', description: '岗位ID' })
  @ApiResponse({ status: 200, description: '成功删除岗位' })
  @Auth('system:post:remove')
  @Log({ title: '岗位管理', businessType: BusinessType.REMOVE })
  @Del('/:postId')
  async delete(@Param('postId') postId: string) {
    return await this.postService.delete(postId);
  }

  // 修改
  @ApiOperation({ summary: '修改岗位', description: '更新岗位信息' })
  @ApiBody({ type: UpdatePostDTO, description: '岗位信息' })
  @ApiResponse({ status: 200, description: '成功修改岗位' })
  @Auth('system:post:edit')
  @Log({ title: '岗位管理', businessType: BusinessType.EDIT })
  @Put('/')
  async update(@Body() post: UpdatePostDTO) {
    return await this.postService.update(post);
  }

  // 获取详情
  @ApiOperation({ summary: '获取岗位详情', description: '根据ID获取岗位详细信息' })
  @ApiParam({ name: 'postId', description: '岗位ID' })
  @ApiResponse({ status: 200, description: '成功获取岗位详情' })
  @Auth('system:post:query')
  @Get('/:postId')
  async get(@Param('postId') postId: number) {
    return await this.postService.detail(postId);
  }

  // 导出
  @ApiOperation({ summary: '导出岗位数据', description: '导出岗位数据到Excel文件' })
  @ApiBody({ type: ListPostDTO, description: '导出条件' })
  @ApiResponse({ status: 200, description: '成功导出岗位数据' })
  @Auth('system:post:export')
  @Log({ title: '岗位管理', businessType: BusinessType.EXPORT })
  @Post('/export')
  async export(@Body() queryParams: ListPostDTO) {
    return await this.postService.export(queryParams);
  }
}

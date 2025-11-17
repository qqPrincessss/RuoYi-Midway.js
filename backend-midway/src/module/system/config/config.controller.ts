import { Controller, Inject, Get, Query, Body, Post, Put, Param, Del } from '@midwayjs/core';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@midwayjs/swagger';
import { ConfigService } from "@module/system/config/config.service";
import { ListConfigDTO, CreateConfigDTO, UpdateConfigDTO } from "@dto/system/config.dto";
import { Auth } from "@decorator/auth.decorator";
import { BusinessType, Log } from "@decorator/log.decorator";

@ApiTags('参数配置')
@Controller('/system/config')
export class ConfigController {
  @Inject()
  configService: ConfigService;

  // 获取列表
  @ApiOperation({ summary: '获取参数配置列表', description: '获取系统参数配置列表' })
  @ApiQuery({ type: ListConfigDTO, description: '查询参数' })
  @ApiResponse({ status: 200, description: '成功获取参数配置列表' })
  @Auth('system:config:list')
  @Get('/list')
  async list(@Query() queryParams: ListConfigDTO) {
    return await this.configService.list(queryParams);
  }

  // 新增
  @ApiOperation({ summary: '新增参数配置', description: '创建新的参数配置' })
  @ApiBody({ type: CreateConfigDTO, description: '参数配置信息' })
  @ApiResponse({ status: 200, description: '成功创建参数配置' })
  @Auth('system:config:add')
  @Log({ title: '参数配置', businessType: BusinessType.ADD })
  @Post('/')
  async create(@Body() config: CreateConfigDTO) {
    return await this.configService.create(config);
  }

  // 删除
  @ApiOperation({ summary: '删除参数配置', description: '根据ID删除参数配置' })
  @ApiParam({ name: 'configId', description: '参数配置ID' })
  @ApiResponse({ status: 200, description: '成功删除参数配置' })
  @Auth('system:config:remove')
  @Log({ title: '参数配置', businessType: BusinessType.REMOVE })
  @Del('/:configId')
  async delete(@Param('configId') configId: string) {
    return await this.configService.delete(configId);
  }

  // 修改
  @ApiOperation({ summary: '修改参数配置', description: '更新参数配置信息' })
  @ApiBody({ type: UpdateConfigDTO, description: '参数配置信息' })
  @ApiResponse({ status: 200, description: '成功修改参数配置' })
  @Auth('system:config:edit')
  @Log({ title: '参数配置', businessType: BusinessType.EDIT })
  @Put('/')
  async update(@Body() config: UpdateConfigDTO) {
    return await this.configService.update(config);
  }

  // 获取详情
  @ApiOperation({ summary: '获取参数配置详情', description: '根据ID获取参数配置详细信息' })
  @ApiParam({ name: 'configId', description: '参数配置ID' })
  @ApiResponse({ status: 200, description: '成功获取参数配置详情' })
  @Auth('system:config:query')
  @Get('/:configId')
  async get(@Param('configId') configId: number) {
    return await this.configService.detail(configId);
  }

  // 导出
  @ApiOperation({ summary: '导出参数配置', description: '导出参数配置数据' })
  @ApiQuery({ type: ListConfigDTO, description: '查询参数' })
  @ApiResponse({ status: 200, description: '成功导出参数配置' })
  @Auth('system:config:export')
  @Log({ title: '参数配置', businessType: BusinessType.EXPORT })
  @Post('/export')
  async export(@Query() queryParams: ListConfigDTO) {
    return await this.configService.export(queryParams);
  }

  // 根据参数键名查询参数值
  @ApiOperation({ summary: '根据参数键名查询参数值', description: '通过配置键获取配置值' })
  @ApiParam({ name: 'configKey', description: '参数键名' })
  @ApiResponse({ status: 200, description: '成功获取参数值' })
  @Get('/configKey/:configKey')
  async getConfigKey(@Param('configKey') configKey: string) {
    return await this.configService.getConfigKey(configKey);
  }

  // 刷新参数缓存
  @ApiOperation({ summary: '刷新参数缓存', description: '刷新系统参数配置缓存' })
  @ApiResponse({ status: 200, description: '成功刷新参数缓存' })
  @Auth('system:config:remove')
  @Log({ title: '参数配置', businessType: BusinessType.CLEAR })
  @Del('/refreshCache')
  async refreshCache() {
    return await this.configService.refreshCache();
  }
}

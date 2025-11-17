import { Controller, Inject, Get, Query, Body, Post, Put, Param, Del } from '@midwayjs/core';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@midwayjs/swagger';
import { GenTableService } from "@service/tool/genTable.service";
import { ListGenTableDTO, CreateGenTableDTO, UpdateGenTableDTO, GenDbTableList } from "@dto/tool/genTable.dto";
import { Auth } from "@decorator/auth.decorator";
import { BusinessType, Log } from "@decorator/log.decorator";

@ApiTags('代码生成')
@Controller('/tool/gen')
export class GenTableController {
  @Inject()
  genTableService: GenTableService;

  // 获取列表
  @ApiOperation({ summary: '获取代码生成表列表', description: '获取代码生成表的列表信息' })
  @ApiQuery({ type: ListGenTableDTO, description: '查询参数' })
  @ApiResponse({ status: 200, description: '成功获取代码生成表列表' })
  @Auth('tool:gen:list')
  @Get('/list')
  async list(@Query() queryParams: ListGenTableDTO) {
    return await this.genTableService.list(queryParams);
  }
  // 获取数据库列表
  @ApiOperation({ summary: '获取数据库表列表', description: '获取数据库中可用于代码生成的表列表' })
  @ApiQuery({ type: GenDbTableList, description: '查询参数' })
  @ApiResponse({ status: 200, description: '成功获取数据库表列表' })
  @Auth('tool:gen:list')
  @Get('/db/list')
  async genDbList(@Query() query: GenDbTableList) {
    return await this.genTableService.genDbList(query);
  }
  //导入表
  @ApiOperation({ summary: '导入数据库表', description: '导入数据库表到代码生成器' })
  @ApiBody({ schema: { type: 'object', properties: { tableNames: { type: 'string', description: '表名列表，多个表名用逗号分隔' } } } })
  @ApiResponse({ status: 200, description: '成功导入数据库表' })
  @Post('/importTable')
  async importTable(@Body("tableNames") tableNames: string) {
    return await this.genTableService.importTable(tableNames);
  }
  // 新增
  @ApiOperation({ summary: '新增代码生成表', description: '创建新的代码生成表配置' })
  @ApiBody({ type: CreateGenTableDTO, description: '代码生成表信息' })
  @ApiResponse({ status: 200, description: '成功创建代码生成表' })
  @Auth('tool:gen:add')
  @Log({ title: '代码生成', businessType: BusinessType.ADD })
  @Post('/')
  async create(@Body() genTable: CreateGenTableDTO) {
    return await this.genTableService.create(genTable);
  }

  // 删除
  @ApiOperation({ summary: '删除代码生成表', description: '根据ID删除代码生成表配置' })
  @ApiParam({ name: 'tableId', description: '表ID' })
  @ApiResponse({ status: 200, description: '成功删除代码生成表' })
  @Auth('tool:gen:remove')
  @Log({ title: '代码生成', businessType: BusinessType.REMOVE })
  @Del('/:tableId')
  async delete(@Param('tableId') tableId: string) {
    return await this.genTableService.delete(tableId);
  }

  // 修改
  @ApiOperation({ summary: '修改代码生成表', description: '更新代码生成表配置信息' })
  @ApiBody({ type: UpdateGenTableDTO, description: '代码生成表信息' })
  @ApiResponse({ status: 200, description: '成功修改代码生成表' })
  @Auth('tool:gen:edit')
  @Log({ title: '代码生成', businessType: BusinessType.EDIT })
  @Put('/')
  async update(@Body() genTable: UpdateGenTableDTO) {
    return await this.genTableService.update(genTable);
  }

  // 获取详情
  @ApiOperation({ summary: '获取代码生成表详情', description: '根据ID获取代码生成表详细信息' })
  @ApiParam({ name: 'tableId', description: '表ID' })
  @ApiResponse({ status: 200, description: '成功获取代码生成表详情' })
  @Auth('tool:gen:query')
  @Get('/:tableId')
  async get(@Param('tableId') tableId: number) {
    return await this.genTableService.detail(tableId);
  }
  
  @ApiOperation({ summary: '同步数据库表结构', description: '同步指定表的数据库结构到代码生成器' })
  @ApiParam({ name: 'tableName', description: '表名' })
  @ApiResponse({ status: 200, description: '成功同步数据库表结构' })
  @Get('/synchDb/:tableName')
  async synchDb(@Param('tableName') tableName: string) {
    return await this.genTableService.synchDb(tableName);
  }
  @ApiOperation({ summary: '预览生成代码', description: '预览指定表的代码生成结果' })
  @ApiParam({ name: 'id', description: '表ID' })
  @ApiResponse({ status: 200, description: '成功预览生成代码' })
  @Get('/preview/:id')
  async preview(@Param('id') id: string) {
    return  await this.genTableService.preview(+id);
  }
  @ApiOperation({ summary: '批量生成代码', description: '批量生成指定表的代码并打包下载' })
  @ApiQuery({ name: 'tableNames', description: '表名列表，多个表名用逗号分隔' })
  @ApiResponse({ status: 200, description: '成功生成代码压缩包' })
  @Get('/batchGenCode/zip')
  async batchGenCode(@Query("tableNames") tables: string) {
    return await this.genTableService.batchGenCode(tables);
  }
}

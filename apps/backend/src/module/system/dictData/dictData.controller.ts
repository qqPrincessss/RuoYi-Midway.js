import { Controller, Inject, Get, Query, Body, Post, Put, Param, Del } from '@midwayjs/core';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@midwayjs/swagger';
import { DictDataService } from "./dictData.service";
import { ListDictDataDTO, CreateDictDataDTO, UpdateDictDataDTO } from "./dto/dictData.dto";
import { Auth } from "@decorator/auth.decorator";
import { BusinessType, Log } from "@decorator/log.decorator";

@ApiTags('字典数据')
@Controller('/system/dict/data')
export class DictDataController {
  @Inject()
  dictDataService: DictDataService;

  // 获取列表
  @ApiOperation({ summary: '获取字典数据列表', description: '获取系统字典数据列表' })
  @ApiQuery({ type: ListDictDataDTO, description: '查询参数' })
  @ApiResponse({ status: 200, description: '成功获取字典数据列表' })
  @Auth('system:dict:list')
  @Get('/list')
  async list(@Query() queryParams: ListDictDataDTO) {
    return await this.dictDataService.list(queryParams);
  }

  // 新增
  @ApiOperation({ summary: '新增字典数据', description: '创建新的字典数据' })
  @ApiBody({ type: CreateDictDataDTO, description: '字典数据信息' })
  @ApiResponse({ status: 200, description: '成功创建字典数据' })
  @Auth('system:dict:add')
  @Log({ title: '字典数据', businessType: BusinessType.ADD })
  @Post('/')
  async create(@Body() dictData: CreateDictDataDTO) {
    return await this.dictDataService.create(dictData);
  }

  // 删除
  @ApiOperation({ summary: '删除字典数据', description: '根据ID删除字典数据' })
  @ApiParam({ name: 'dictCode', description: '字典数据编码' })
  @ApiResponse({ status: 200, description: '成功删除字典数据' })
  @Auth('system:dict:remove')
  @Log({ title: '字典数据', businessType: BusinessType.REMOVE })
  @Del('/:dictCode')
  async delete(@Param('dictCode') dictCode: string) {
    return await this.dictDataService.delete(dictCode);
  }

  // 修改
  @ApiOperation({ summary: '修改字典数据', description: '更新字典数据信息' })
  @ApiBody({ type: UpdateDictDataDTO, description: '字典数据信息' })
  @ApiResponse({ status: 200, description: '成功修改字典数据' })
  @Auth('system:dict:edit')
  @Log({ title: '字典数据', businessType: BusinessType.EDIT })
  @Put('/')
  async update(@Body() dictData: UpdateDictDataDTO) {
    return await this.dictDataService.update(dictData);
  }

  // 获取详情
  @ApiOperation({ summary: '获取字典数据详情', description: '根据ID获取字典数据详细信息' })
  @ApiParam({ name: 'dictCode', description: '字典数据编码' })
  @ApiResponse({ status: 200, description: '成功获取字典数据详情' })
  @Auth('system:dict:query')
  @Get('/:dictCode')
  async get(@Param('dictCode') dictCode: number) {
    return await this.dictDataService.detail(dictCode);
  }

  // 导出
  @ApiOperation({ summary: '导出字典数据', description: '导出字典数据' })
  @ApiQuery({ type: ListDictDataDTO, description: '查询参数' })
  @ApiResponse({ status: 200, description: '成功导出字典数据' })
  @Auth('system:dict:export')
  @Log({ title: '字典数据', businessType: BusinessType.EXPORT })
  @Post('/export')
  async export(@Query() queryParams: ListDictDataDTO) {
    return await this.dictDataService.export(queryParams);
  }

  // 根据字典类型查询字典数据信息
  @ApiOperation({ summary: '根据字典类型查询字典数据', description: '通过字典类型获取对应的字典数据列表' })
  @ApiParam({ name: 'dictType', description: '字典类型' })
  @ApiResponse({ status: 200, description: '成功获取字典数据' })
  @Get('/type/:dictType')
  async typeDataList(@Param('dictType') dictType: string) {
    return await this.dictDataService.getDictDataByType(dictType);
  }
}

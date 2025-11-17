import { Controller, Inject, Get, Provide, Body, Post, Del, Param, Put, Query } from "@midwayjs/core";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@midwayjs/swagger';
import { DictTypeService } from "../../service/system/dictType.service";
import { ListDictTypeDTO, CreateDictTypeDTO, UpdateDictTypeDTO } from "../../dto/system/dictTypeDto";
import { Auth } from "../../decorator/auth.decorator";
import { BusinessType, Log } from "@decorator/log.decorator";

@ApiTags('字典类型')
@Controller('/system/dict/type')
@Provide()
export class DictTypeController {
  @Inject()
  dictTypeService: DictTypeService;
  /**
   * 获取字典类型列表
   * @GET /system/dict/type/list
   */
  @ApiOperation({ summary: '获取字典类型列表', description: '获取系统字典类型列表' })
  @ApiQuery({ type: ListDictTypeDTO, description: '查询参数' })
  @ApiResponse({ status: 200, description: '成功获取字典类型列表' })
  @Auth('system:dict:list')
  @Get('/list')
  async list(@Query () queryParams: ListDictTypeDTO) {
    return await this.dictTypeService.list(queryParams);
  }

  @ApiOperation({ summary: '新增字典类型', description: '创建新的字典类型' })
  @ApiBody({ type: CreateDictTypeDTO, description: '字典类型信息' })
  @ApiResponse({ status: 200, description: '成功创建字典类型' })
  @Auth('system:dict:add')
  @Log({ title: '字典管理', businessType: BusinessType.ADD })
  @Post('/')
  async addDictType(@Body() dictType: CreateDictTypeDTO) {
      return await this.dictTypeService.addDictType(dictType);
  }

  /**
   * 删除字典类型
   * @DELETE /system/dict/type/:dictId
   */
  @ApiOperation({ summary: '删除字典类型', description: '根据ID删除字典类型' })
  @ApiParam({ name: 'dictId', description: '字典类型ID' })
  @ApiResponse({ status: 200, description: '成功删除字典类型' })
  @Auth('system:dict:remove')
  @Log({ title: '字典管理', businessType: BusinessType.REMOVE })
  @Del('/:dictId')
  async deleteDictType(@Param('dictId') dictId: string) {
      return await this.dictTypeService.deleteDictType(dictId);
    
  }

  @ApiOperation({ summary: '修改字典类型', description: '更新字典类型信息' })
  @ApiBody({ type: UpdateDictTypeDTO, description: '字典类型信息' })
  @ApiResponse({ status: 200, description: '成功修改字典类型' })
  @Auth('system:dict:edit')
  @Log({ title: '字典管理', businessType: BusinessType.EDIT })
  @Put('/')
  async updateDictType(@Body() dictType: UpdateDictTypeDTO) {
      return await this.dictTypeService.updateDictType(dictType);
  }
   // 获取详情
  @ApiOperation({ summary: '获取字典类型详情', description: '根据ID获取字典类型详细信息' })
  @ApiParam({ name: 'dictId', description: '字典类型ID' })
  @ApiResponse({ status: 200, description: '成功获取字典类型详情' })
  @Auth('system:dict:query')
  @Get('/:dictId')
  async get(@Param('dictId') dictId: number) {
    return await this.dictTypeService.detail(dictId);
  }

  // 导出
  @ApiOperation({ summary: '导出字典类型', description: '导出字典类型数据' })
  @ApiBody({ type: ListDictTypeDTO, description: '查询参数' })
  @ApiResponse({ status: 200, description: '成功导出字典类型' })
  @Auth('system:dict:export')
  @Log({ title: '字典管理', businessType: BusinessType.EXPORT })
  @Post('/export')
  async export(@Body() queryParams: ListDictTypeDTO) {
    return await this.dictTypeService.export(queryParams);
  }

  // 获取字典选择框列表
  @ApiOperation({ summary: '获取字典选择框列表', description: '获取字典类型选择框列表' })
  @ApiResponse({ status: 200, description: '成功获取字典选择框列表' })
  @Get('/optionselect')
  async optionSelect() {
    return await this.dictTypeService.optionSelect();
  }

  // 刷新字典缓存
  @ApiOperation({ summary: '刷新字典缓存', description: '刷新系统字典缓存' })
  @ApiResponse({ status: 200, description: '成功刷新字典缓存' })
  @Auth('system:dict:remove')
  @Log({ title: '字典管理', businessType: BusinessType.CLEAR })
  @Del('/refreshCache')
  async refreshCache() {
    return await this.dictTypeService.refreshCache();
  }
}
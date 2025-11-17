import * as Lodash from 'lodash';
export const controllerTem = (options) => {
  const { BusinessName, businessName, functionName, moduleName, primaryKey } = options;
  const serviceName = `${Lodash.upperFirst(BusinessName)}Service`;
  const serviceInstance = `${businessName}Service`;
  const name = functionName.replace(/表/g, '');
  return `
import { Controller, Inject, Get, Query, Param, Del, Post, Put, Body } from '@midwayjs/core';
import { Auth } from "../decorator/auth.decorator";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@midwayjs/swagger';
import { BusinessType, Log } from "../decorator/log.decorator";
import { ${serviceName} } from '@service/${businessName}.service';
import { Create${Lodash.upperFirst(BusinessName)}Dto, Update${Lodash.upperFirst(BusinessName)}Dto, Query${Lodash.upperFirst(BusinessName)}Dto} from '@dto/${businessName}.dto';

@ApiTags('${name}')
@Controller('${moduleName}/${businessName}')
export class ${Lodash.upperFirst(BusinessName)}Controller {
  @Inject()
  ${serviceInstance}: ${serviceName};
  // 创建
  @ApiOperation({ summary: '创建${name}', description: '创建新的${name}记录' })
  @ApiBody({ type: Create${Lodash.upperFirst(BusinessName)}Dto, description: '${name}信息数据' })
  @ApiResponse({ status: 200, description: '创建成功' })
  @Auth('${moduleName}:${businessName}:add')
  @Log({ title: '${name}-创建', businessType: BusinessType.ADD })
  @Post('/')
  async create(@Body() body: Create${Lodash.upperFirst(BusinessName)}Dto) {
    return await this.${serviceInstance}.create(body);
  }
  // 获取列表
  @ApiOperation({ summary: '获取${name}列表', description: '分页查询${name}信息列表' })
  @ApiResponse({ status: 200, description: '查询成功' })
  @Auth('${moduleName}:${businessName}:query')
  @Log({ title: '${name}-列表', businessType: BusinessType.LIST })
  @Get('/list')
  async list(@Query() query: Query${Lodash.upperFirst(BusinessName)}Dto) {
    return await this.${serviceInstance}.list(query);
  }
  // 获取详情
  @ApiOperation({ summary: '获取${name}详情', description: '根据${primaryKey}查询${name}详细信息' })
  @ApiParam({ name: '${primaryKey}', description: '${primaryKey}值' })
  @ApiResponse({ status: 200, description: '查询成功' })
  @Auth('${moduleName}:${businessName}:query')
  @Log({ title: '${name}-详情', businessType: BusinessType.DETAIL })
  @Get('/:${primaryKey}')
  async detail(@Param('${primaryKey}') ${primaryKey}: string) {
    return await this.${serviceInstance}.detail(${primaryKey});
  }
  // 修改
  @ApiOperation({ summary: '修改${name}', description: '根据${primaryKey}修改${name}信息' })
  @ApiBody({ type: Update${Lodash.upperFirst(BusinessName)}Dto, description: '更新的${name}信息数据' })
  @ApiResponse({ status: 200, description: '修改成功' })
  @Auth('${moduleName}:${businessName}:edit')
  @Log({ title: '${name}-修改', businessType: BusinessType.EDIT })
  @Put('/')
  async update(@Body() body: Update${Lodash.upperFirst(BusinessName)}Dto) {
    return await this.${serviceInstance}.update(body);
  }
  // 删除
  @ApiOperation({ summary: '删除${name}', description: '根据${primaryKey}删除${name}记录' })
  @ApiParam({ name: '${primaryKey}', description: '${primaryKey}值' })
  @ApiResponse({ status: 200, description: '删除成功' })
  @Auth('${moduleName}:${businessName}:remove')
  @Log({ title: '${name}-删除', businessType: BusinessType.REMOVE })  
  @Del('/:${primaryKey}')
  async remove(@Param('${primaryKey}') ${primaryKey}: string) {
    const ${primaryKey}s = ${primaryKey}.split(',').map((${primaryKey}) => +${primaryKey});
    return this.${serviceInstance}.remove(${primaryKey}s);
  }
  // 导出
  @ApiOperation({ summary: '导出${name}', description: '根据查询参数导出${name}数据' })
  @ApiBody({ type: Query${Lodash.upperFirst(BusinessName)}Dto, description: '导出查询参数' })
  @ApiResponse({ status: 200, description: '导出成功' })
  @Auth('${moduleName}:${businessName}:export')
  @Log({ title: '${name}-导出', businessType: BusinessType.EXPORT })
  @Post('/export')
  async export(@Body() queryParams: Query${Lodash.upperFirst(BusinessName)}Dto) {
    return await this.${serviceInstance}.export(queryParams);
  }
}`;
};

import { Controller,Inject,Get,Body,Post,Del,Param,Put, Query } from "@midwayjs/core";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@midwayjs/swagger';
import { DeptService } from "@service/system/dept.service";
import { ListDeptDTO, CreateDeptDTO, UpdateDeptDTO } from "../../dto/system/deptDto";
import { Auth } from "../../decorator/auth.decorator";
import { BusinessType, Log } from "@decorator/log.decorator";

@ApiTags('部门管理')
@Controller('/system/dept')
export class DeptController {
  @Inject()
  deptService: DeptService;

  // 获取列表
  @ApiOperation({ summary: '获取部门列表', description: '获取系统部门列表' })
  @ApiQuery({ type: ListDeptDTO, description: '查询参数' })
  @ApiResponse({ status: 200, description: '成功获取部门列表' })
  @Get('/list')
  async list(@Query() queryParams: ListDeptDTO) {
    return await this.deptService.list(queryParams);
  }

  // 新增
  @ApiOperation({ summary: '新增部门', description: '创建新的部门' })
  @ApiBody({ type: CreateDeptDTO, description: '部门信息' })
  @ApiResponse({ status: 200, description: '成功创建部门' })
  @Auth('system:dept:add')
  @Log({ title: '部门管理', businessType: BusinessType.ADD })
  @Post('/')
  async create(@Body() dept: CreateDeptDTO) {
    return await this.deptService.create(dept);
  }

  // 删除
  @ApiOperation({ summary: '删除部门', description: '根据ID删除部门' })
  @ApiParam({ name: 'deptId', description: '部门ID' })
  @ApiResponse({ status: 200, description: '成功删除部门' })
  @Auth('system:dept:remove')
  @Log({ title: '部门管理', businessType: BusinessType.REMOVE })
  @Del('/:deptId')
  async delete(@Param('deptId') deptId: number) {
    return await this.deptService.delete(deptId);
  }

  // 修改
  @ApiOperation({ summary: '修改部门', description: '更新部门信息' })
  @ApiBody({ type: UpdateDeptDTO, description: '部门信息' })
  @ApiResponse({ status: 200, description: '成功修改部门' })
  @Auth('system:dept:edit')
  @Log({ title: '部门管理', businessType: BusinessType.EDIT })
  @Put('/')
  async update(@Body() dept: UpdateDeptDTO) {
    return await this.deptService.update(dept);
  }

  // 获取详情
  @ApiOperation({ summary: '获取部门详情', description: '根据ID获取部门详细信息' })
  @ApiParam({ name: 'deptId', description: '部门ID' })
  @ApiResponse({ status: 200, description: '成功获取部门详情' })
  @Auth('system:dept:query')
  @Get('/:deptId')
  async get(@Param('deptId') deptId: number) {
    return await this.deptService.detail(deptId);
  }

  // 排除子节点，点击部门详情时获取 弹框选择上级部门时使用，需要排除子节点
  @ApiOperation({ summary: '获取排除子节点的部门列表', description: '获取排除指定部门子节点的部门列表' })
  @ApiParam({ name: 'deptId', description: '要排除的部门ID' })
  @ApiResponse({ status: 200, description: '成功获取排除子节点的部门列表' })
  @Auth('system:dept:list')
  @Get('/list/exclude/:deptId')
  async excludeChild() {
    return await this.deptService.excludeChild();
  }
}

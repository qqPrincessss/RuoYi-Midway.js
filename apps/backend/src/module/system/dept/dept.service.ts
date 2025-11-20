import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { DeptDao } from './dept.dao';
import { ListDeptDTO, CreateDeptDTO, UpdateDeptDTO } from './dto/dept.dto';

@Provide()
export class DeptService {
  @Inject()
  ctx: Context;

  @Inject()
  deptDao: DeptDao;

  // 列表
  async list(queryParams: ListDeptDTO) {
    return this.deptDao.list(queryParams);
  }

  // 添加
  async create(dept: CreateDeptDTO) {
    return this.deptDao.create(dept);
  }

  // 删除
  async delete(deptId: number) {
    return this.deptDao.delete(deptId);
  }

  // 修改
  async update(dept: UpdateDeptDTO) {
    return this.deptDao.update(dept);
  }

  // 详情
  async detail(deptId: number) {
    return this.deptDao.detail(deptId);
  }

  // 排除子节点（根据路由参数拿 deptId）
  async excludeChild() {
    const deptId = Number(this.ctx.params.deptId);
    return this.deptDao.excludeChild(deptId);
  }

  // 树状结构
  async deptTree() {
    return this.deptDao.deptTree();
  }
}
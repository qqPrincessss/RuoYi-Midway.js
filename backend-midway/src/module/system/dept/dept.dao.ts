import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { SysDept } from '@entity/framework/system/SysDept';
import { User } from '@entity/framework/system/SysUser';
import { ListDeptDTO, CreateDeptDTO, UpdateDeptDTO } from '@dto/system/deptDto';
import { resBuild } from '@utils/resBuild';
import { checkIfExsit } from '@utils/serviceHelp';
import { listToTree } from '@utils/tree';
import { getOperator } from '@utils';

@Provide()
export class DeptDao {
  @Inject()
  ctx: Context;

  @InjectEntityModel(SysDept)
  deptRepo: Repository<SysDept>;

  @InjectEntityModel(User)
  userRepo: Repository<User>;

  // 列表
  async list(queryParams: ListDeptDTO) {
    const qb = this.deptRepo.createQueryBuilder('entity');

    if (queryParams.deptName) {
      qb.andWhere('entity.deptName LIKE :deptName', { deptName: `%${queryParams.deptName}%` });
    }
    if (queryParams.status) {
      qb.andWhere('entity.status = :status', { status: queryParams.status });
    }

    qb.addOrderBy('entity.orderNum', 'ASC');
    qb.addOrderBy('entity.createTime', 'DESC');

    const rows = await qb.getMany();
    return resBuild.data(rows);
  }

  // 添加
  async create(dept: CreateDeptDTO) {
    // 新增之前先判断是否已存在（按部门名唯一）
    await checkIfExsit(this.deptRepo, 'deptName', dept.deptName);

    // 查询父级部门信息，构造 ancestors
    let ancestors = '';
    if (typeof dept.parentId !== 'undefined' && dept.parentId !== null) {
      const parentRecord = await this.deptRepo.findOneBy({ deptId: dept.parentId as any });
      if (parentRecord) {
        ancestors = parentRecord.ancestors ? `${parentRecord.ancestors},${dept.parentId}` : `${dept.parentId}`;
      }
    }

    // 执行新增
    const entity = this.deptRepo.create({ ...dept, ancestors });
    entity.setCreateBy(getOperator(this.ctx));
    await this.deptRepo.save(entity);

    return resBuild.success();
  }

  // 删除：先判断部门下是否有子节点，再判断部门下是否有人，如果有则提示，没有则删除
  async delete(deptId: number) {
    // 是否存在子节点：匹配 ancestors 中包含 deptId 的记录
    const qb = this.deptRepo.createQueryBuilder('dept');
    qb.where('dept.ancestors LIKE :mid OR dept.ancestors LIKE :start OR dept.ancestors LIKE :end', {
      mid: `%,${deptId},%`,
      start: `${deptId},%`,
      end: `%,${deptId}`,
    });
    const rows = await qb.getMany();
    if (rows.length > 0) {
      throw new Error('存在子节点，不能删除');
    }

    // 部门下是否有用户
    const isDeptIncludesUser = await this.userRepo.find({ where: { deptId } });
    if (isDeptIncludesUser.length > 0) {
      throw new Error('部门下存在用户，不能删除');
    }

    // 一级部门不可删除
    const isLevelOne = await this.deptRepo.findOne({ where: { parentId: 0 as any, deptId } });
    if (isLevelOne) {
      throw new Error('当前部门为一级部门，不能删除');
    }

    await this.deptRepo.delete(deptId);
    return resBuild.success();
  }

  // 修改
  async update(dept: UpdateDeptDTO) {
    const entity = this.deptRepo.create(dept);
    entity.setUpdateBy(getOperator(this.ctx));
    await this.deptRepo.update(dept.deptId, entity);
    return resBuild.success();
  }

  // 详情
  async detail(deptId: number) {
    const detailInfo = await this.deptRepo.findOneBy({ deptId });
    return resBuild.data(detailInfo);
  }

  // 排除子节点，点击部门详情时获取 弹框选择上级部门时使用，需要排除子节点
  async excludeChild(deptId: number) {
    const qb = this.deptRepo.createQueryBuilder('dept');
    qb.where('dept.deptId != :deptId', { deptId });
    qb.andWhere('NOT (dept.ancestors LIKE :mid OR dept.ancestors LIKE :start OR dept.ancestors LIKE :end)', {
      mid: `%,${deptId},%`,
      start: `${deptId},%`,
      end: `%,${deptId}`,
    });
    const rows = await qb.getMany();
    return resBuild.data(rows);
  }

  // 树状结构，用户列表页用
  async deptTree() {
    // 从部门表取关键数据
    const rows = await this.deptRepo.find({
      select: ['deptId', 'parentId', 'deptName'],
      where: { status: '0' },
    });
    console.log(rows);
    // 构造树状结构
    const deptTreeList = listToTree(rows, 'deptId', 'deptName');
    return resBuild.data(deptTreeList);
  }
}
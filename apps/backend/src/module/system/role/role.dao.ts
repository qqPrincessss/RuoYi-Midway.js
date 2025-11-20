import { Provide, Inject, Context } from "@midwayjs/core";
import { In, Not, Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { SysRole } from './entites/SysRole';
import { ChangeStatusDto, ListRoleDTO, CreateRoleDTO, UpdateRoleDTO, ListAuthUserDTO, CancelAuthUserDTO, BatchCancelAuthUserDTO, BatchBindAuthUserDTO } from "./dto/role.dto";
import { checkIfExsit, checkUpdateKeyRepeat } from "@/utils/serviceHelp";
import { resBuild } from '@/utils/resBuild';
import { SysUser } from "../user/entites/SysUser";
import { SysUserRole } from "../user/entites/SysUserRole";
import { SysRoleMenu } from "./entites/SysRoleMenu";
import { SysDept } from "../dept/entites/SysDept";
import { getOperator } from "@utils";

@Provide()
export class RoleDao {
  @InjectEntityModel(SysRole)
  roleModel: Repository<SysRole>;

  @InjectEntityModel(SysUser)
  protected userEntity: Repository<SysUser>;

  @InjectEntityModel(SysUserRole)
  protected userRoleEntity: Repository<SysUserRole>;

  @InjectEntityModel(SysDept)
  protected deptEntity: Repository<SysDept>;

  @InjectEntityModel(SysRoleMenu)
  protected roleMenuEntity: Repository<SysRoleMenu>;
  @Inject()
  ctx: Context;




  //获取角色列表
  async getRoleList(queryParams: ListRoleDTO) {
    const queryBuilder = this.roleModel.createQueryBuilder('entity');
    if (queryParams.roleName) {
      queryBuilder.andWhere('entity.roleName LIKE :roleName', { roleName: `%${queryParams.roleName}%` });
    }
    if (queryParams.roleKey) {
      queryBuilder.andWhere('entity.roleKey LIKE :roleKey', { roleKey: `%${queryParams.roleKey}%` });
    }
    if (queryParams.status) {
      queryBuilder.andWhere('entity.status = :status', { status: queryParams.status });
    }
    // 时间范围，包含全天
    if (queryParams['params[beginTime]'] && queryParams['params[endTime]']) {
      queryBuilder.andWhere('entity.createTime BETWEEN :beginTime AND :endTime', {
        beginTime: queryParams['params[beginTime]'] + ' 00:00:00',
        endTime: queryParams['params[endTime]'] + ' 23:59:59',
      });
    }

    if (queryParams.pageNum && queryParams.pageSize) {
      queryBuilder.skip((queryParams.pageNum - 1) * queryParams.pageSize).take(queryParams.pageSize);
    }

    queryBuilder.addOrderBy('entity.roleSort', 'ASC');
    queryBuilder.addOrderBy('entity.createTime', 'DESC');

    const [rows, total] = await queryBuilder.getManyAndCount();
    return resBuild.list(rows, total);
  }

  //添加角色

  async addRole(role: CreateRoleDTO) {
    await checkIfExsit(this.roleModel, "roleName", role.roleName)
    await checkIfExsit(this.roleModel, "roleKey", role.roleKey)
    const payload = {
      roleName: role.roleName,
      roleKey: role.roleKey,
      roleSort: role.roleSort,
      status: role.status,
      remark: role.remark,
      deptCheckStrictly: role.deptCheckStrictly === 1,
      menuCheckStrictly: role.menuCheckStrictly === 1,
    };
    const myEntity = this.roleModel.create(payload);
    myEntity.setCreateBy(getOperator(this.ctx));
    const addResult = await this.roleModel.save(myEntity);

    // 添加角色和菜单关联信息
    await this.roleConnectWithMenu(addResult.roleId, role.menuIds)
    return resBuild.success()

  }

  //删除角色
  async delRole(roleId: string) {
    const ids = roleId.split(',').map(id => Number(id));
    await this.roleModel.delete(ids);
    return resBuild.success();
  }

  //更新角色
  async update(role: UpdateRoleDTO) {
    await checkUpdateKeyRepeat(this.roleModel, "roleName", role.roleName)
    await checkUpdateKeyRepeat(this.roleModel, "roleKey", role.roleKey)
    const payload = {
      roleId: role.roleId,
      roleName: role.roleName,
      roleKey: role.roleKey,
      roleSort: role.roleSort,
      status: role.status,
      remark: role.remark,
      deptCheckStrictly: role.deptCheckStrictly === 1,
      menuCheckStrictly: role.menuCheckStrictly === 1,
    };
    const entity = this.roleModel.create(payload);
    entity.setUpdateBy(getOperator(this.ctx));
    await this.roleModel.save(entity);
    // 先删除角色和菜单关联信息，再重新添加
    await this.roleMenuEntity.delete({
      roleId: role.roleId
    })
    // 重新添加角色和菜单关联信息
    await this.roleConnectWithMenu(role.roleId, role.menuIds);
    return resBuild.success();
  }
  // 详情
  async detail(roleId: number) {
    const detailInfo = await this.roleModel.findOneBy({
      roleId,
    });
    return resBuild.data(detailInfo)
  }

  // 已分配的用户列表
  async allocatedUserList(body: ListAuthUserDTO) {
    const roleHasUserIds = await this.userRoleEntity.find({
      select: ['userId'],
      where: { roleId: body.roleId }
    });
    const userIds = roleHasUserIds.map(item => item.userId);
    const entity = this.userEntity.createQueryBuilder('user');
    entity.where('user.status = :status', { status: '0' });
    entity.andWhere({ userId: Not(In(userIds)) });

    if (body.userName) {
      entity.andWhere('user.userName LIKE :userName', { userName: `%${body.userName}%` });
    }
    if (body.phonenumber) {
      entity.andWhere('user.phonenumber LIKE :phone', { phone: `%${body.phonenumber}%` });
    }

    entity.skip((body.pageNum - 1) * body.pageSize).take(body.pageSize);
    entity.leftJoinAndMapOne('user.dept', SysDept, 'dept', 'user.deptId = dept.deptId');

    const [rows, total] = await entity.getManyAndCount();
    return resBuild.list(rows, total);
  }

  // 未分配的用户列表
  async unallocatedUserList(body: ListAuthUserDTO) {
    const roleHasUserIds = await this.userRoleEntity.find({
      select: ['userId'],
      where: { roleId: body.roleId }
    });
    const userIds = roleHasUserIds.map(item => item.userId);

    const entity = this.userEntity.createQueryBuilder('user');
    entity.where('user.status = :status', { status: '0' });
    entity.andWhere({ userId: Not(In(userIds)) });

    if (body.userName) {
      entity.andWhere('user.userName LIKE :userName', { userName: `%${body.userName}%` });
    }
    if (body.phonenumber) {
      entity.andWhere('user.phonenumber LIKE :phone', { phone: `%${body.phonenumber}%` });
    }

    entity.skip((body.pageNum - 1) * body.pageSize).take(body.pageSize);
    entity.leftJoinAndMapOne('user.dept', SysDept, 'dept', 'user.deptId = dept.deptId');

    const [rows, total] = await entity.getManyAndCount();
    return resBuild.list(rows, total);
  }

  // 取消授权用户
  async cancelAuthUser(body: CancelAuthUserDTO) {
    await this.userRoleEntity.delete({
      roleId: body.roleId,
      userId: body.userId
    })
    return resBuild.success()
  }

  // 批量 取消授权用户
  async batchCancelAuthUser(body: BatchCancelAuthUserDTO) {
    const userIds = body.userIds.split(',').map(id => Number(id));
    await this.userRoleEntity.delete({
      roleId: body.roleId,
      userId: In(userIds)
    })
    return resBuild.success()
  }

  // 批量授权绑定用户
  async batchBindAuthUser(body: BatchBindAuthUserDTO) {
    const userIds = body.userIds.split(',').map(id => Number(id));
    const userRoleList = userIds.map(userId => {
      return {
        roleId: body.roleId,
        userId
      }
    })
    await this.userRoleEntity.save(userRoleList)
    return resBuild.success()
  }
  // 表格 - 修改角色状态
  async changeStatus(body: ChangeStatusDto) {
    await this.roleModel.update({
      roleId: body.roleId
    }, {
      status: body.status
    })
    return resBuild.success('状态修改成功')
  }
  /** -------------以下为辅助函数--------------- */
  // 角色和菜单的关联
  async roleConnectWithMenu(roleId: number, menuIds: number[]) {
    const roleMenuList = menuIds.map(menuId => {
      return {
        roleId,
        menuId
      }
    })
    await this.roleMenuEntity.save(roleMenuList)
  }

}

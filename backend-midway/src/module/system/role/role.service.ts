import{ Inject, Provide } from "@midwayjs/core";
import { RoleDao } from "../../dao/system/role.dao";
import { ListRoleDTO, CreateRoleDTO, UpdateRoleDTO, ListAuthUserDTO, CancelAuthUserDTO, BatchCancelAuthUserDTO, BatchBindAuthUserDTO,ChangeStatusDto } from "@dto/system/roleDto";
@Provide()
export class RoleService {
  @Inject()
  roleDao:RoleDao

  //获取角色列表
  async getRoleList(queryParams:ListRoleDTO){
    return await this.roleDao.getRoleList(queryParams)
  }
  //添加角色
  async addRole(role:CreateRoleDTO){
    return await this.roleDao.addRole(role)
  }

  //删除角色
  async delete(roleId:string){
    return await this.roleDao.delRole(roleId)
  }

  //更新角色
  async update(role:UpdateRoleDTO){
    return await this.roleDao.update(role);
  }
    // 获取详情
   async detail(roleId: number) {
    return await this.roleDao.detail(roleId);
  }
  // 获取角色已分配用户列表
  async allocatedUserList(queryParams: ListAuthUserDTO) {
    return await this.roleDao.allocatedUserList(queryParams);
  }
  // 取消授权用户
  async cancelAuthUser(queryParams: CancelAuthUserDTO) {
    return await this.roleDao.cancelAuthUser(queryParams);
  }
  // 批量 取消授权用户
  async batchCancelAuthUser(queryParams: BatchCancelAuthUserDTO) {
    return await this.roleDao.batchCancelAuthUser(queryParams);
  }
  // 批量 绑定授权用户
  async batchBindAuthUser(queryParams: BatchBindAuthUserDTO) {
    return await this.roleDao.batchBindAuthUser(queryParams);
  }
  // 获取角色未分配用户列表
  async unallocatedUserList(queryParams: ListAuthUserDTO) {
    return await this.roleDao.unallocatedUserList(queryParams);
  }
    async changeStatus(body: ChangeStatusDto) {
    return await this.roleDao.changeStatus(body);
  }
}

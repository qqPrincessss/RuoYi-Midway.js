import { Provide, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from "@midwayjs/typeorm";
import { Repository } from "typeorm";
import { User as NormalEntity } from "@entity/framework/system/SysUser";
import { SysRole as RoleEntity } from "@entity/framework/system/SysRole";
import { resBuild } from "@utils/resBuild";
import { SysDept } from '@entity/framework/system/SysDept';

// role中加入admin字段、断言，这时多出来的返回给前端字段
interface RoleEntityWithAdmin extends RoleEntity {
  admin?: boolean;
}
// user中加入admin字段、断言，这时多出来的返回给前端字段
interface UserEntityWithAdmin extends NormalEntity {
  admin?: boolean;
}

/** 获取基本的用户信息 */
@Provide()
export class UserInfoService {

  @Inject()
  ctx: Context;

  @InjectEntityModel(NormalEntity)
  protected dynamicModel: Repository<NormalEntity>;
  @InjectEntityModel(SysDept)
  protected deptModel: Repository<SysDept>;



  // 查询用户信息
  async getUserInfo() {
    const userId = this.ctx.session.userInfo.userId;
    if (userId) {
      let userInfo: UserEntityWithAdmin = await this.dynamicModel.findOne({
        where: {
          userId: userId
        },
        relations: ['dept', 'roles', 'roles.menus']
      })

      // 如果查询到用户信息，稍微处理格式、然后返回用户信息
      if (userInfo) {
        // 角色列表
        const roles = [];
        userInfo.roles.forEach((role: RoleEntityWithAdmin) => {
          roles.push(role.roleKey);
          role.admin = role.roleKey === 'admin';
        })

        // 是否为超管
        const isAdmin = roles.includes('admin')
        userInfo.admin = isAdmin;

        // 权限列表
        let permissions = []

        // 如果是超管，拥有所有权限，处理roles格式返回给前端
        if (isAdmin) {
          permissions = ['*:*:*'];
        } else {
          userInfo.roles.forEach((role: RoleEntityWithAdmin) => {
            role.menus.forEach((menu) => {
              permissions.push(menu.perms)
            })
          })
        }
        this.ctx.session.permissions = permissions;
        return resBuild.data({
          user: userInfo,
          roles,
          permissions
        })
      }
    } else {
      throw new Error('用户信息不存在')
    }
  }
}

import { Guard, IGuard, getPropertyMetadata, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { Auth_META_KEY } from '../decorator/auth.decorator';
import { RedisService } from '@midwayjs/redis';
import { RedisEnum } from "../utils/enum";

// 权限校验 - 守卫

@Guard()
export class AuthGuard implements IGuard<Context> {

  @Inject()
  redisService: RedisService;

  async canActivate(context: Context, supplierClz: any, methodName: string): Promise<boolean> {
    // 如果缓存获取为空，默认开启，否则按缓存走
    const temp = await this.redisService.get(`${RedisEnum.SYS_CONFIG_KEY}sys.permission.enable`)
    const isUseAuth = temp === null ? true : JSON.parse(temp)
    // 校验是否有权限
    const authName = getPropertyMetadata<string[]>(Auth_META_KEY, supplierClz, methodName);
    if(authName && JSON.parse(isUseAuth)) {
      const permissionList = context.session.permissions || []
      if(permissionList.length > 0) {
        if(context.session.permissions[0].includes('*:*:*')) {
          return true
        } else {
          if(!permissionList.includes(authName)) {
            context.code = 403
            context.throw('抱歉，您没有足够的权限访问该资源：' + authName);
          }
        }
      } else {
        context.throw('权限为空');
      }
    }
    return true
  }
}

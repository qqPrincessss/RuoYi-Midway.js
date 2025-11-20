import {Middleware, IMiddleware, Inject } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';
import { Decrypt, Encrypt } from '@/utils/aes'; // Decrypt
import { RedisService } from '@midwayjs/redis';
import { RedisEnum } from "@utils/enum";

// 加密白名单
const whiteList = [
  '/',
  '/captchaImage',
  '/public',
  '/logout'
]

@Middleware()
export class EncryptMiddleware implements IMiddleware<Context, NextFunction> {

  @Inject()
  redisService: RedisService;

  resolve() {
    return async (ctx: Context, next: NextFunction) => {


      // 获取路由地址
      const routerUrl = ctx.request.url.split('?')[0];

      // 如果白名单，直接放行, 或者包含导入导出接口，因为导入导出是流式数据，不用加密，上传等接口
     if (whiteList.includes(routerUrl) || routerUrl.includes('/importData') || routerUrl.includes('/export') || routerUrl.includes('/profile/avatar') || routerUrl.includes('/batchGenCode/zip')) {
        await next();
      } else {
        const temp = await this.redisService.get(`${RedisEnum.SYS_CONFIG_KEY}sys.interface.enable`)
        const isOpenCrypt = temp === null ? true : JSON.parse(temp)

        // 请求方式
        const requestMethod = ctx.method.toUpperCase()
        // 如果开启了加密
        if(isOpenCrypt) {
          if(requestMethod === 'GET') {
            await next();
            ctx.response.body = Encrypt(JSON.stringify(ctx.response.body));
          } else if(['POST', 'PUT'].includes(requestMethod)) {
            const body: any = ctx.request.body
            // post、put等，先对参数解密
            ctx.request.body = JSON.parse((Decrypt(body?.param)));
            await next();
            // 然后对接口返回的数据进行加密
            ctx.response.body = Encrypt(JSON.stringify(ctx.response.body));
          } else {
            // DELETE等其他方式，直接next
            await next();
          }
        } else {
          // 如果关闭了加密，但是前端还开启加密，所以要解析参数、只解析、不加密返回
          if(['POST', 'PUT'].includes(requestMethod)) {
            const body: any = ctx.request.body
            // post、put等，先对参数解密
            ctx.request.body = JSON.parse((Decrypt(body?.param)));
            await next();
          } else {
            // DELETE等其他方式，直接next
            await next();
          }
        }
      }
    };
  }

  static getName(): string {
    return 'encrypt';
  }
}

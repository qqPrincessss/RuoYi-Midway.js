import { httpError, Inject } from "@midwayjs/core";
import { JwtService } from '@midwayjs/jwt';
import { Middleware, IMiddleware } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';
import { RedisService } from '@midwayjs/redis';
import { RedisEnum } from '@/utils/enum';

// 白名单，不需要token校验的jwt路由
const whiteList = [
  '/',
  '/captchaImage',
  '/login',
  '/logout',
  '/registerUser',
  '/public',
  '/register'
]

@Middleware()
export class JwtMiddleware implements IMiddleware<Context, NextFunction> {
  @Inject()
  jwtService: JwtService;
  @Inject()
  redisService: RedisService;


  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 获取路由地址
      const originUrl = ctx.request.url;
      const routerUrl = originUrl.split('?')[0];

      // 如果当前地址不在白名单里，校验token，否则直接放行
      if (!whiteList.includes(routerUrl)) {
        const header = ctx.request.header;
        // 兼容 Authorization 或 Cookie，优先使用请求头
        const tokenFromHeader = header.authorization ? header.authorization.replace(/^Bearer\s+/i, '') : null;
        const tokenFromCookie = ctx.cookies.get('token');
        const token = tokenFromHeader || tokenFromCookie;
        const tokenId = ctx.session?.userInfo?.tokenId;
        if (!token) {
          throw new httpError.UnauthorizedError('token值不能为空');
        }
        const logData = await this.redisService.get(`${RedisEnum.LOGIN_TOKEN_KEY}${tokenId}`);
        if (!logData) {
          throw new httpError.UnauthorizedError('token已失效，请重新登录');
        }
        try {
          await this.jwtService.verify(token);
        } catch (e) {
          console.log('jwt.middleware捕捉错误', e);
          throw new httpError.UnauthorizedError('token已失效，请重新登录');
        }
        await next();
      } else {
        await next();
      }
    };
  }

  static getName(): string {
    return 'jwt';
  }
}

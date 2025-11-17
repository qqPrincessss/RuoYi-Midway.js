import { Catch } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Catch()
export class DefaultErrorFilter {
  async catch(err: Error, ctx: Context) {
    // 所有的未分类错误会到这里，如未设置ctx.code，则默认设置为500
    return {
      code: ctx.code || 500,
      message: err.message,
    };
  }
}

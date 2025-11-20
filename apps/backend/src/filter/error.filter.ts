import { Catch, HttpStatus, httpError } from '@midwayjs/core';
import { MidwayValidationError } from '@midwayjs/validate';
import { Context } from '@midwayjs/koa';

@Catch()
export class ErrorFilter {
  /**
   * 处理捕获到的错误，并返回相应的错误响应
   * @param err 捕获到的错误
   * @param ctx 请求上下文
   * @returns 返回错误响应对象
   */
  async catch(err: Error, ctx: Context) {

    let statusCode: number;
    let message: string;
    if (err instanceof MidwayValidationError || err instanceof httpError.BadRequestError) {
      statusCode = HttpStatus.BAD_REQUEST; // 400
      message = 'Bad request';
    } else if (err instanceof httpError.UnauthorizedError) {
      statusCode = HttpStatus.UNAUTHORIZED; // 401
      message = 'Unauthorized';
    } else if (err instanceof httpError.ForbiddenError) {
      statusCode = HttpStatus.FORBIDDEN; // 403
      message = 'Forbidden';
    } else if (err instanceof httpError.NotFoundError) {
      statusCode = HttpStatus.NOT_FOUND; // 404
      message = 'Not Found';
    } else if (err instanceof httpError.ConflictError) {
      statusCode = HttpStatus.CONFLICT; // 409
      message = 'Conflict';
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR; // 500
      message = 'Internal Server Error';
    }

    // 明确设置响应状态码
    ctx.status = statusCode;

    // 设置响应体
    ctx.body = {
      code: ctx.status,
      message: err.message, // 开发模式下使用
    };

    // 打印日志
    console.log(statusCode, message, err.stack);

    // 防止后续中间件修改响应
    return ctx.body;
  }
}

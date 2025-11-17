import { Middleware, IMiddleware } from "@midwayjs/core";
import { Context, NextFunction } from "@midwayjs/koa";
@Middleware()
export class ApiMiddleware implements IMiddleware<Context, NextFunction> {
    public static getName(): string {
        return "api";
    }
    resolve() {
        return async (ctx: Context, next: NextFunction) => {
            const result = await next();
            return {
                code: 200,
                message: "success",
                data: result,
            }
        }
    }
}
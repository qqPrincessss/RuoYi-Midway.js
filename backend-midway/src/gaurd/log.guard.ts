import { Guard, IGuard, getPropertyMetadata, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { OPERATION_META_KEY } from "@decorator/log.decorator";
import { SysOperLog } from "@/entity/framework/monitor/SysOperLog";
import { InjectEntityModel } from "@midwayjs/typeorm";
import { Repository } from "typeorm";
import { getIp } from "@utils/device";
import { formatDate } from '@utils/time'
import { RedisService } from '@midwayjs/redis';
import { RedisEnum } from "@utils/enum";

// 操作日志 - 守卫

/** todo:消息异常的记录 */

@Guard()
export class LogGuard implements IGuard<Context> {

  @Inject()
  redisService: RedisService;

  @InjectEntityModel(SysOperLog)
  protected SysOperLog: Repository<SysOperLog>;

  async canActivate(ctx: Context, supplierClz: any, methodName: string): Promise<any> {
    const logInfo: any = getPropertyMetadata<string[]>(OPERATION_META_KEY, supplierClz, methodName);

    // 如果缓存获取为空，默认开启，否则按缓存走
    const temp = await this.redisService.get(`${RedisEnum.SYS_CONFIG_KEY}sys.operLog.enable`)
    const isUseOperLog = temp === null ? true : JSON.parse(temp)

    if (logInfo && isUseOperLog) {
      const startTime = Date.now();

      // 每毫米检测一次，如果请求体有值，则清除定时器，并打印请求耗时，误差在2毫秒以内
      let isHasBody = setInterval(async () => {
        if (ctx.response.body) {
          clearInterval(isHasBody)
          // 请求方式、统一大写
          const requestMethod = ctx.method.toUpperCase()
          // 请求地址
          const requestUrl = ctx.request.path

          const logData: any = {
            title: logInfo.title,
            businessType: logInfo.businessType || 0,
            method: supplierClz.name + '.' + methodName,
            operUrl: requestUrl,
            operationType: ctx.method.toLowerCase(),
            requestMethod: requestMethod,
            operator: ctx.session?.userInfo?.userName || '--',
            operIp: getIp(ctx),
            status: ctx.status === 200 ? '0' : '1',
            operTime: formatDate(new Date()),
            costTime: Date.now() - startTime,
            operName: ctx.session?.userInfo?.userName || '--'
          };

          // 设置各请求类型的请求参数
          switch (requestMethod) {
            case 'PUT':
            case 'POST':
              logData.operParam = JSON.stringify(ctx.request.body);
              break;
            case 'DELETE':
              logData.operParam = JSON.stringify(ctx.params);
              break;
            case 'GET':
              logData.operParam = JSON.stringify(ctx.query);
              break
          }

          if (ctx.status !== 204) {
            // 如果是导出，直接提示操作成功
            if (requestUrl.includes('/export')) {
              logData.jsonResult = JSON.stringify({
                message: '操作成功',
                code: 200,
              });
            } else {
              logData.jsonResult = JSON.stringify(ctx.response.body);
            }
          }

          // 构建新增的实体类，并赋值保存到数据库，这种方式能自动记录创建人、创建时间
          const tempEntity: any = this.SysOperLog.create(logData);
          await this.SysOperLog.save(tempEntity);
        }
      }, 1)
    }

    return true
  }
}

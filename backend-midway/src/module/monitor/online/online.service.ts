import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ListOnlineDTO } from '@dto/monitor/online.dto';
import { OnlineDao } from '@dao/monitor/online.dao';

@Provide()
export class OnlineService {
  @Inject()
  ctx: Context;

  @Inject()
  onlineDao: OnlineDao;

  // 列表
  async list(queryParams: ListOnlineDTO) {
    return this.onlineDao.list(queryParams);
  }
  async delete(tokenId: string) {
    return await this.onlineDao.delete(tokenId);
  }
}
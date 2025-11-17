import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ListOnlineDTO } from './dto/online.dto';
import { RedisService } from '@midwayjs/redis';
import { RedisEnum } from '@utils/enum';
import { Paginate } from '@utils/serviceHelp';
import { resBuild } from '@utils/resBuild';

@Provide()
export class OnlineDao {
  @Inject()
  ctx: Context;
  @Inject()
  redisService: RedisService;

  // 列表
  async list(queryParams: ListOnlineDTO) {
    const keys = await this.redisService.keys(`${RedisEnum.LOGIN_TOKEN_KEY}*`);
    const data = await this.redisService.mget(keys);
    const list = Paginate(
      {
        list: data,
        pageSize: queryParams.pageSize,
        pageNum: queryParams.pageNum,
      },
      queryParams
    ).map(item => {
      item = JSON.parse(item);
      return {
        tokenId: item.tokenId,
        userName: item.userName,
        ipaddr: item.ipaddr,
        loginLocation: item.loginLocation,
        browser: item.browser,
        os: item.os,
        loginTime: item.loginTime,
      };
    });
    return resBuild.list(list, list.length);
    // const queryBuilder = this.onlineRepo.createQueryBuilder('entity');

    // if (queryParams.ipaddr) {
    //   queryBuilder.andWhere('entity.ipAddr LIKE :ipaddr', { ipaddr: `%${queryParams.ipaddr}%` });
    // }
    // if (queryParams.userName) {
    //   queryBuilder.andWhere('entity.userName LIKE :userName', { userName: `%${queryParams.userName}%` });
    // }

    // // 默认按登录时间降序
    // queryBuilder.addOrderBy('entity.loginTime', 'DESC');

    // if (queryParams.pageNum && queryParams.pageSize) {
    //   queryBuilder.skip((queryParams.pageNum - 1) * queryParams.pageSize).take(queryParams.pageSize);
    // }

    // const [rows, total] = await queryBuilder.getManyAndCount();
    // return resBuild.list(rows, total);
  }

  async delete(tokenId: string) {
    await this.redisService.del(`${RedisEnum.LOGIN_TOKEN_KEY}${tokenId}`);
    return resBuild.success();
  }
}

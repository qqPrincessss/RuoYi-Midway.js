import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { RedisService } from '@midwayjs/redis';

@Provide()
export class CacheDao {
  @Inject()
  ctx: Context;


  @Inject()
  redisService: RedisService;

  // 列表
  async getInfo() {
    const rawInfo = await this.redisService.info();
    // 按行分割字符串
    const lines = rawInfo.split('\r\n');
    const parsedInfo = {};
    // 遍历每一行并分割键值对
    lines.forEach((line) => {
      const [key, value] = line.split(':');
      parsedInfo[key?.trim()] = value?.trim();
    });
    return parsedInfo;
  }
  async getDbSize(){
    return await this.redisService.dbsize();
  }
  async commandStats(){
    const rawInfo = await this.redisService.info('commandstats');
    // 按行分割字符串
    const lines = rawInfo.split('\r\n');
    const commandStats = [];
    // 遍历每一行并分割键值对
    lines.forEach((line) => {
      const [key, value] = line.split(':');
      if (key && value) {
        commandStats.push({
          name: key?.trim()?.replaceAll('cmdstat_', ''),
          value: +value?.trim()?.split(',')[0]?.split('=')[1],
        });
      }
    });
    return commandStats;
  }
}

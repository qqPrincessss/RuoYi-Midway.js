import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { CacheDao } from './cache.dao';
import { resBuild } from '@utils/resBuild';
import { RedisService } from '@midwayjs/redis';
import { DeepClone } from '@utils';
@Provide()
export class CacheService {
  @Inject()
  ctx: Context;

  @Inject()
  CacheDao: CacheDao;
  @Inject()
  redisService: RedisService;
  caches = [
    {
      cacheName: 'login_tokens:',
      cacheKey: '',
      cacheValue: '',
      remark: '用户信息',
    },
    {
      cacheName: 'sys_config:',
      cacheKey: '',
      cacheValue: '',
      remark: '配置信息',
    },
    {
      cacheName: 'sys_dict:',
      cacheKey: '',
      cacheValue: '',
      remark: '数据字典',
    },
    {
      cacheName: 'captcha_codes:',
      cacheKey: '',
      cacheValue: '',
      remark: '验证码',
    },
    {
      cacheName: 'repeat_submit:',
      cacheKey: '',
      cacheValue: '',
      remark: '防重提交',
    },
    {
      cacheName: 'rate_limit:',
      cacheKey: '',
      cacheValue: '',
      remark: '限流处理',
    },
    {
      cacheName: 'pwd_err_cnt:',
      cacheKey: '',
      cacheValue: '',
      remark: '密码错误次数',
    },
  ];

  // 列表
  async list() {
    const info = await this.CacheDao.getInfo();
    const dbSize = await this.CacheDao.getDbSize();
    const commandStats = await this.CacheDao.commandStats();
    return resBuild.data({ info, dbSize, commandStats });
  }
  //获取缓存列表
  async getNames() {
    return resBuild.data(this.caches);
  }
  //获取缓存内容
  async getContent(params) {
    const list = DeepClone(this.caches);
    const data = list.find((item) => item.cacheName === params.cacheName);
    const cacheValue = await this.redisService.get(params.cacheKey);
    data.cacheValue =cacheValue;
    data.cacheKey = params.cacheKey;
    return resBuild.data(data);
  }
  //获取缓存键名列表
  async getKeys(id: string) {
    const data = await this.redisService.keys(id + '*');
    return resBuild.data(data);
  }
  //清除缓存键名
    async clearCacheKey(id: string) {
      await this.redisService.del(id);
      return resBuild.success('清除成功');
    } 
  //清除缓存名
    async clearCacheName(id: string) {
      const keys = await this.redisService.keys(id + '*');
      await this.redisService.del(keys);
      return resBuild.success('清除成功');
    }
  //清除所有缓存
    async clearCacheAll() {
      await this.redisService.reset();
      return resBuild.success('清除成功');
    }
}
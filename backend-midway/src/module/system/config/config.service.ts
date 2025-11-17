import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { RedisService } from '@midwayjs/redis';
import { RedisEnum } from '@utils/enum';
import { ConfigDao } from './config.dao';
import { ListConfigDTO, CreateConfigDTO, UpdateConfigDTO } from './dto/config.dto';
import { resBuild } from '@utils/resBuild';

@Provide()
export class ConfigService {
  @Inject()
  ctx: Context;

  @Inject()
  redisService: RedisService;

  @Inject()
  configDao: ConfigDao;

  // 列表
  async list(queryParams: ListConfigDTO) {
    return await this.configDao.list(queryParams);
  }

  // 添加
  async create(config: CreateConfigDTO) {
    const res = await this.configDao.create(config);
    // 同步更新redis缓存
    await this.redisService.set(`${RedisEnum.SYS_CONFIG_KEY}${config.configKey}`, config.configValue);
    return res;
  }

  // 删除
  async delete(configId: string) {
    const ids = configId.split(',').map(id => Number(id));
    // 删除前获取列表以清理redis缓存
    const delConfigList = await this.configDao.findByIds(ids);
    for (const item of delConfigList) {
      if (item.configKey) {
        await this.redisService.del(`${RedisEnum.SYS_CONFIG_KEY}${item.configKey}`);
      }
    }
    return await this.configDao.deleteByIds(ids);
  }

  // 修改
  async update(config: UpdateConfigDTO) {
    const res = await this.configDao.update(config);
    // 同步更新redis缓存
    await this.redisService.set(`${RedisEnum.SYS_CONFIG_KEY}${config.configKey}`, config.configValue);
    return res;
  }

  // 详情
  async detail(configId: number) {
    return await this.configDao.detail(configId);
  }

  // 导出
  async export(queryParams: ListConfigDTO) {
    return await this.configDao.export(queryParams);
  }

  // 根据参数键名查询参数值
  async getConfigKey(configKey: string) {
    // 先从redis获取
    const redisValue = await this.redisService.get(`${RedisEnum.SYS_CONFIG_KEY}${configKey}`);
    if (redisValue) {
      // 如果获取到，直接返回
      return resBuild.success(redisValue);
    } else {
      // 未获取到，从数据库获取并写入redis
      const detailInfo = await this.configDao.findByKey(configKey);
      const value = detailInfo?.configValue ?? '';
      await this.redisService.set(`${RedisEnum.SYS_CONFIG_KEY}${configKey}`, value);
      return resBuild.success(value);
    }
  }

  // 刷新缓存
  async refreshCache() {
    const allConfigList = await this.configDao.findAll();
    for (const item of allConfigList) {
      await this.redisService.set(`${RedisEnum.SYS_CONFIG_KEY}${item.configKey}`, item.configValue);
    }
    return resBuild.success();
  }
}
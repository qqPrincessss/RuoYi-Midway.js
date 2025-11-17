import { Controller, Inject, Get, Param, Del} from '@midwayjs/core';
import { ApiTags, ApiOperation, ApiResponse } from '@midwayjs/swagger';
import { CacheService } from "@service/monitor/cache.service";

@ApiTags('缓存监控')
@Controller('/monitor/cache')
export class cacheController {
  @Inject()
  cacheService: CacheService
  // 获取列表
  @ApiOperation({ summary: '获取缓存信息', description: '获取系统缓存监控信息' })
  @ApiResponse({ status: 200, description: '成功获取缓存信息' })
  @Get()
  async list() {
    return await this.cacheService.list();
  }
  //获取缓存列表
  @ApiOperation({ summary: '获取缓存列表', description: '获取系统缓存列表' })
  @ApiResponse({ status: 200, description: '成功获取缓存列表' })
  @Get('/getNames')
  async getNames() {
    return await this.cacheService.getNames();
  }
  //缓存内容
  @ApiOperation({ summary: '获取缓存内容', description: '获取系统缓存内容' })
  @ApiResponse({ status: 200, description: '成功获取缓存内容' })
  @Get('/getValue/:cacheName/:cacheKey')
  async getContent(@Param() params: string[]) {
    return await this.cacheService.getContent(params);
  }
  //键名列表
  @ApiOperation({ summary: '获取键名列表', description: '获取系统缓存键名列表' })
  @ApiResponse({ status: 200, description: '成功获取键名列表' })
  @Get('/getKeys/:id')
  async getKeys(@Param('id') id: string) {
    return await this.cacheService.getKeys(id);
  }
  //删除缓存名
  @ApiOperation({ summary: '删除缓存名', description: '删除系统缓存名' })
  @ApiResponse({ status: 200, description: '成功删除缓存名' })
  @Del('/clearCacheName/:cacheName')
  async clearCacheName(@Param('cacheName') cacheName: string) {
    return await this.cacheService.clearCacheName(cacheName); 
  }
  //清理缓存键
  @ApiOperation({ summary: '清理缓存键', description: '清理系统缓存键' })
  @ApiResponse({ status: 200, description: '成功清理缓存键' })
  @Del('/clearCacheKey/:cacheKey')
  async clearCacheKey(@Param('cacheKey') cacheKey: string) {
    return await this.cacheService.clearCacheKey(cacheKey);
  }
  //清理所有缓存
  @ApiOperation({ summary: '清理所有缓存', description: '清理系统所有缓存' })
  @ApiResponse({ status: 200, description: '成功清理所有缓存' })
  @Del('/clearAllCache')
  async clearAllCache() {
    return await this.cacheService.clearCacheAll();
  }
}

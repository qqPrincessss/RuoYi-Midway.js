import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { DictDataDao } from './dictData.dao';
import { ListDictDataDTO, CreateDictDataDTO, UpdateDictDataDTO } from './dto/dictData.dto';

@Provide()
export class DictDataService {
  @Inject()
  ctx: Context;


  @Inject()
  dictDataDao: DictDataDao;

  // 获取列表
  async list(queryParams: ListDictDataDTO) {
    return await this.dictDataDao.list(queryParams);
  }

  // 新增字典数据（写入后清理对应类型的缓存）
  async create(dictData: CreateDictDataDTO) {
    return await this.dictDataDao.create(dictData);
  }

  // 删除字典数据（删除前获取详情，删除后清理涉及类型的缓存）
  async delete(dictCode: string) {
       return await this.dictDataDao.delete(dictCode);
  }

  // 修改字典数据（写入后清理对应类型的缓存）
  async update(dictData: UpdateDictDataDTO) {
     return await this.dictDataDao.update(dictData);
  }

  // 详情
  async detail(dictCode: number) {
    return await this.dictDataDao.detail(dictCode);
  }

  // 导出
  async export(queryParams: ListDictDataDTO) {
    return await this.dictDataDao.export(queryParams);
  }

  // 根据字典类型查询字典数据（带缓存）
  async getDictDataByType(dictType: string) {
    return await this.dictDataDao.getDictDataByType(dictType);
  }
}
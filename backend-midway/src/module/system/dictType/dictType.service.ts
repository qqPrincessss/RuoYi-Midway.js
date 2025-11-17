import { Provide, Inject } from "@midwayjs/core";
import { DictTypeDao } from "../../dao/system/dictType.dao";
import { ListDictTypeDTO, CreateDictTypeDTO, UpdateDictTypeDTO } from "../../dto/system/dictTypeDto";

@Provide()
export class DictTypeService {
  @Inject()
  dictTypeDao: DictTypeDao;

  // 获取字典类型列表
  async list(queryParams: ListDictTypeDTO) {
    return await this.dictTypeDao.list(queryParams);
  }

  // 新建字典类型
  async addDictType(dictType: CreateDictTypeDTO) {
    return await this.dictTypeDao.createDictTYpe(dictType);
  }

  // 删除字典类型
  async deleteDictType(dictId: string) {
    return await this.dictTypeDao.delete(dictId);
  }

  // 更新字典类型
  async updateDictType(dictType: UpdateDictTypeDTO) {
    return await this.dictTypeDao.updateDictType(dictType);
  }

  // 获取详情
  async detail(dictId: number) {
    return await this.dictTypeDao.detail(dictId);
  }
  async export(queryParams: ListDictTypeDTO) {
    return await this.dictTypeDao.export(queryParams);
  }
  async optionSelect() {
    return await this.dictTypeDao.optionSelect();
  }
  // 刷新缓存
  async refreshCache() {
    return await this.dictTypeDao.refreshCache();
  }
}

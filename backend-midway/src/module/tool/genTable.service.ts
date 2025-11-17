import { Provide, Inject } from '@midwayjs/core';
import { GenTableDao } from './genTable.dao';
import { ListGenTableDTO, CreateGenTableDTO, UpdateGenTableDTO, GenDbTableList } from './dto/genTable.dto';

@Provide()
export class GenTableService {
  @Inject()
  genTableDao: GenTableDao;

  // 列表
  async list(queryParams: ListGenTableDTO) {
    return await this.genTableDao.list(queryParams);
  }
  async genDbList(query: GenDbTableList) {
    return this.genTableDao.genDbList(query);
  }
   async importTable(tableNames: string) {

    const tableNameList = tableNames.split(',');
    const tableList = await this.genTableDao.selectDbTableListByNames(tableNameList);
    return await this.genTableDao.importTable(tableList);
  }
  // 添加
  async create(genTable: CreateGenTableDTO) {
    return await this.genTableDao.create(genTable);
  }

  // 删除
  async delete(tableId: string) {
    return await this.genTableDao.delete(tableId);
  }

  // 修改
  async update(genTable: UpdateGenTableDTO) {
    return await this.genTableDao.update(genTable);
  }

  // 详情
  async detail(tableId: number) {
    return await this.genTableDao.detail(tableId);
  }
  // 同步数据库表结构
  async synchDb(tableName: string) {
    return await this.genTableDao.synchDb(tableName);
  }
  // 预览
  async preview(id: number) {
    return await this.genTableDao.preview(id);
  }  
  async batchGenCode(tables: string) {
    return await this.genTableDao.batchGenCode(tables);
  }
}
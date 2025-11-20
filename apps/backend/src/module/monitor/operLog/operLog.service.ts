import { Provide, Inject } from '@midwayjs/core';
import { OperLogDao } from './operLog.dao';
import { ListOperLogDTO } from './dto/operLog.dto';

@Provide()
export class OperLogService {
  @Inject()
  operLogDao: OperLogDao;

  // 列表
  async list(queryParams: ListOperLogDTO) {
    return await this.operLogDao.list(queryParams);
  }

  // 删除
  async delete(operId: string) {
    return await this.operLogDao.delete(operId);
  }

  // 详情
  async detail(operId: number) {
    return await this.operLogDao.detail(operId);
  }

  // 导出
  async export(queryParams: ListOperLogDTO) {
    return await this.operLogDao.export(queryParams);
  }

  // 清空日志记录数据
  async clean() {
    return await this.operLogDao.clean();
  }
}
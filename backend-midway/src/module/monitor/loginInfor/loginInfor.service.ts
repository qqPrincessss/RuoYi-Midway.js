import { Provide, Inject } from '@midwayjs/core';
import { LoginInforDao } from '@dao/monitor/loginInfor.dao';
import { ListLoginInforDTO } from '@dto/monitor/loginInfor.dto';

@Provide()
export class LoginInforService {
  @Inject()
  loginInforDao: LoginInforDao;

  // 列表
  async list(queryParams: ListLoginInforDTO) {
    return await this.loginInforDao.list(queryParams);
  }

  // 删除
  async delete(infoId: string) {
    return await this.loginInforDao.delete(infoId);
  }

  // 导出
  async export(queryParams: ListLoginInforDTO) {
    return await this.loginInforDao.export(queryParams);
  }

  // 清空
  async clean() {
    return await this.loginInforDao.clean();
  }

  // 解锁
  async unlock(userName: string) {
    return await this.loginInforDao.unlock(userName);
  }
}
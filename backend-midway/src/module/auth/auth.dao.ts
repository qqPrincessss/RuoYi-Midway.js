import { Provide } from '@midwayjs/core';
import { Repository } from 'typeorm';
import { SysUser } from '../system/user/entites/SysUser';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { LoginDTO } from './dto/auth.dto';
import { resBuild } from '../../utils/resBuild';
import { MonitorLogininfor } from '../monitor/loginInfor/entites/MonitorLogininfor';

@Provide()
export class AuthDao {

  @InjectEntityModel(SysUser)
  userModel: Repository<SysUser>;

  @InjectEntityModel(MonitorLogininfor)
  loginInforEntity: Repository<MonitorLogininfor>;

  //查找是否存在用户
  async checkId(id: number): Promise<any> {
    const user = await this.userModel.findOne({ where: { userId: id }, select: ['userId', 'userName', 'password'] });
    return resBuild.data(user);
  }

  //用于登录接口
  async getUserById(id: LoginDTO['userName']): Promise<any> {
    const user = await this.userModel.findOne({ where: { userName: id }, select: ['userId', 'userName', 'password'] })
    return resBuild.data(user);
  }

  // 根据用户名查找用户
  async getUserByUserName(userName: string): Promise<SysUser | null> {
    return await this.userModel.findOne({
      where: {
        userName: userName
      }
    });
  }

  // 保存登录日志
  async saveLoginLog(logData: any): Promise<void> {
    const tempEntity = this.loginInforEntity.create(logData);
    await this.loginInforEntity.save(tempEntity);
  }
}

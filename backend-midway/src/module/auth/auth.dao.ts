import { Provide } from '@midwayjs/core';
import { Repository } from 'typeorm';
import { User } from '../system/user/entites/SysUser';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { LoginDTO } from './dto/auth.dto';
import { resBuild } from '../../utils/resBuild';
import { SysLogininfor } from '../monitor/loginInfor/entites/SysLogininfor';

@Provide()
export class AuthDao {

  @InjectEntityModel(User)
  userModel: Repository<User>;

  @InjectEntityModel(SysLogininfor)
  loginInforEntity: Repository<SysLogininfor>;

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
  async getUserByUserName(userName: string): Promise<User | null> {
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

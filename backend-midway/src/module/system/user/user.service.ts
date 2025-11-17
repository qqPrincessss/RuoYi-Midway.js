import { ListUserDTO, CreateUserDTO, UpdateUserDTO, UpdatePwdDto, ResetPwdDto, ChangeStatusDto, UpdateProfileDto, UpdateAuthRoleDTO } from "@dto/system/userDto";
import { Provide, Inject } from '@midwayjs/core';
import { UserDao } from '../../dao/system/user.dao';
import { ImportExcelDTO } from "@dto/common/excel.dto";
import { UploadFileInfo } from "@midwayjs/busboy";

@Provide()
export class UserService {
  @Inject()
  userDao: UserDao;

  //获取用户列表
  async userList(queryParams: ListUserDTO): Promise<object> {
    return await this.userDao.list(queryParams)
  }
  async create(user: CreateUserDTO): Promise<object> {
    return await this.userDao.create(user)
  }
  async delete(userId: string): Promise<object> {
    return await this.userDao.delete(userId)
  }
  async update(user: UpdateUserDTO): Promise<object> {
    return await this.userDao.update(user)
  }
  async detail(userId: number | undefined) {
    return await this.userDao.detail(userId)
  }
  async export(queryParams: ListUserDTO) {
    return await this.userDao.export(queryParams)
  }
  async importTemplate() {
    return await this.userDao.importTemplate()
  }
  async importData(body: ImportExcelDTO) {
    return await this.userDao.importData(body)
  }
  async resetPsw(body: ResetPwdDto) {
    return await this.userDao.resetPsw(body)
  }
  async changeStatus(body: ChangeStatusDto) {
    return await this.userDao.changeStatus(body)
  }
  async authRoleList(userId: number) {
    return await this.userDao.authRoleList(userId)
  }
  async authRoleUpdate(body: UpdateAuthRoleDTO) {
    return await this.userDao.authRoleUpdate(body)
  }
  async profile() {
    return await this.userDao.profile()
  }
   async teacherList() {
    return await this.userDao.teacherList();
  }
  async profileAvatar(file: UploadFileInfo) {
    return await this.userDao.profileAvatar(file)
  }
  async updatePwd(updatePsw: UpdatePwdDto) {
    return await this.userDao.updatePwd(updatePsw)
  }
  async updateProfile(user: UpdateProfileDto) {
    return await this.userDao.updateProfile(user)
  }
}

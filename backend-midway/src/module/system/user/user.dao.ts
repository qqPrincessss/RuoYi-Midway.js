import { Inject, Provide, } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from "@midwayjs/typeorm";
import { Repository, In, Not } from "typeorm";
import { User } from "@entity/framework/system/SysUser";
import { SysUserPost } from "@entity/framework/system/SysUserPost";
import { SysUserRole } from "@entity/framework/system/SysUserRole";
import { SysRoleDept } from "@entity/framework/system/SysRoleDept";
import { SysRole } from "@entity/framework/system/SysRole";
import { SysPost } from "@entity/framework/system/SysPost";
import { StudentEntity } from '@entity/user/student.entity';
import { TeacherEntity } from '@entity/teacher.entity';

import { ListUserDTO, CreateUserDTO, UpdateUserDTO, UpdatePwdDto, ResetPwdDto, ChangeStatusDto, UpdateProfileDto, UpdateAuthRoleDTO } from "@dto/system/userDto";
import { ImportExcelDTO } from "@dto/common/excel.dto";
import { DownloadExcelService } from "@service/common/downloadExcel";
import { ResolveExcelService } from "@service/common/resolveWebExcel";
import { resBuild } from "@utils/resBuild";
import { checkIfExsit } from "@utils/serviceHelp";
import { getOperator, deepClone } from "@utils";
import { genHashPsw, isEqualPsw } from '@utils/password';
import { UploadFileInfo } from '@midwayjs/busboy';

@Provide()
export class UserDao {
  @Inject()
  ctx: Context;

  @Inject()
  protected downloadExcelService: DownloadExcelService;

  @Inject()
  protected resolveExcelService: ResolveExcelService;

  @InjectEntityModel(User)
  protected userEntity: Repository<User>;

  @InjectEntityModel(SysRoleDept)
  protected deptEntity: Repository<SysRoleDept>;

  @InjectEntityModel(SysPost)
  protected postEntity: Repository<SysPost>;

  @InjectEntityModel(SysRole)
  protected roleEntity: Repository<SysRole>;

  @InjectEntityModel(SysUserPost)
  protected userPostEntity: Repository<SysUserPost>;

  @InjectEntityModel(SysUserRole)
  protected userRoleEntity: Repository<SysUserRole>;
  @InjectEntityModel(StudentEntity)
  protected studentRepo: Repository<StudentEntity>;
  @InjectEntityModel(TeacherEntity)
  protected teacherRepo: Repository<TeacherEntity>;



  // 列表
  async list(queryParams: ListUserDTO) {
    const queryBuilder = this.userEntity
      .createQueryBuilder('entity')
      .leftJoinAndSelect('entity.dept', 'dept');

    if (queryParams.userName) {
      queryBuilder.andWhere('entity.userName LIKE :userName', { userName: `%${queryParams.userName}%` });
    }
    if (queryParams.phonenumber) {
      queryBuilder.andWhere('entity.phonenumber LIKE :phone', { phone: `%${queryParams.phonenumber}%` });
    }
    if (queryParams.status) {
      queryBuilder.andWhere('entity.status = :status', { status: queryParams.status });
    }
    // 时间范围，包含全天
    if (queryParams['params[beginTime]'] && queryParams['params[endTime]']) {
      queryBuilder.andWhere('entity.createTime BETWEEN :beginTime AND :endTime', {
        beginTime: queryParams['params[beginTime]'] + ' 00:00:00',
        endTime: queryParams['params[endTime]'] + ' 23:59:59',
      });
    }

    if (queryParams.deptId) {
      queryBuilder.orWhere('dept.deptId = :deptId', { deptId: queryParams.deptId });
      // Postgres 等价写法：在 ancestors 的逗号分隔字符串中查找 deptId
      queryBuilder.orWhere(":ancestors = ANY(string_to_array(dept.ancestors, ','))", { ancestors: String(queryParams.deptId) });
    }

    if (queryParams.pageNum && queryParams.pageSize) {
      queryBuilder.skip((queryParams.pageNum - 1) * queryParams.pageSize).take(queryParams.pageSize);
    }

    const [rows, total] = await queryBuilder.getManyAndCount();
    return resBuild.list(rows, total);
  }

  // 添加
  async create(user: CreateUserDTO) {
    // 新增之前先判断是否已存在该
    await checkIfExsit(this.userEntity, 'userName', user.userName)

    // 根据明文密码生成hash密码
    user.password = await genHashPsw(user.password)

    // 新增用户
    const myEntity = this.userEntity.create(user);
    myEntity.setCreateBy(getOperator(this.ctx))
    const addResult = await this.userEntity.save(myEntity);

    // 如果存在岗位、批量新增岗位用户关联
    if (user.postIds && user.postIds.length > 0) {
      await this.userConnectWithPost(addResult.userId, user.postIds)
    }

    // 如果存在角色，批量新增角色用户关联
    if (user.roleIds && user.roleIds.length > 0) {
      await this.userConnectWithRole(addResult.userId, user.roleIds)
    }

    return resBuild.success()
  }

  // 删除：删除用户时，需要同时删除用户岗位关联，用户角色关联
  async delete(userId: string) {
    // 构建ids数组
    const ids: number[] = userId.split(',').map(id => Number(id));

    // 删除用户
    await this.userEntity.delete(ids);

    // 删除用户岗位关联
    await this.userPostEntity.delete({ userId: In(ids) });

    // 删除用户角色关联
    await this.userRoleEntity.delete({ userId: In(ids) });

    return resBuild.success()
  }

  // 修改
  async update(user: UpdateUserDTO) {
    // 先找到要修改的那条记录
    let updateRecord: any = await this.userEntity.findOne({
      where: {
        userId: user.userId
      }
    });

    // 执行更新
    const myEntity = this.userEntity.create(user);
    myEntity.setUpdateBy(getOperator(this.ctx))
    await this.userEntity.save(myEntity);

    // 如果原记录的用户和岗位关系发生改变，需要重新设置关联
    if (updateRecord.postIds !== user.postIds) {
      // 取消用户岗位关联，然后再关联，假装这就是更新
      await this.userPostEntity.delete({
        userId: user.userId
      })
      if (user.postIds && user.postIds.length > 0) {
        await this.userConnectWithPost(user.userId, user.postIds)
      }
    }

    // 如果原记录的用户和角色关系发生改变，需要重新设置关联
    if (updateRecord.roleIds !== user.roleIds) {
      // 取消用户角色关联，然后再关联，假装这就是更新
      await this.userRoleEntity.delete({
        userId: user.userId
      })
      if (user.roleIds && user.roleIds.length > 0) {
        await this.userConnectWithRole(user.userId, user.roleIds)
      }
    }

    return resBuild.success()
  }

  // 详情
  async detail(userId: number | undefined) {
    // 获取所有岗位
    const postList = await this.postEntity.find();
    // 获取所有角色，超管除外(不给勾选)
    const roleList = await this.roleEntity.find({
      where: {
        roleId: Not(1)
      }
    });

    if (!userId) {
      // 对应接口：/system/user/
      // 如果userId为空，新增用户的时候用，只返回posts和roles列表作下拉
      return resBuild.data({
        posts: postList,
        roles: roleList,
      })
    } else {
      // 对应接口：/system/user/:userId
      const detailInfo = await this.userEntity.findOne({
        where: {
          userId: userId
        },
        relations: ['dept', 'roles', 'posts']
      });

      // 用户所拥有的岗位
      const postIds = await this.userPostEntity.find({
        where: {
          userId: userId
        }
      })
      // 用户所拥有的角色
      const roleIds = await this.userRoleEntity.find({
        where: {
          userId: userId
        }
      })

      return resBuild.data({
        data: detailInfo,
        postIds: postIds.map(item => item.postId),
        roleIds: roleIds.map(item => item.roleId),
        posts: postList,
        roles: roleList,
      })
    }
  }

  // 导出
  async export(queryParams: ListUserDTO) {
    // 默认导出全部，去掉分页参数
    delete queryParams.pageNum;
    delete queryParams.pageSize;
    let headers = [
      { label: "用户编号", prop: "userId", },
      { label: "用户名称", prop: "userName", },
      { label: "用户昵称", prop: "nickName", },
      { label: "部门", prop: "dept.deptName", },
      { label: "手机号码", prop: "phonenumber", },
      { label: "状态", prop: "status", },
      { label: "创建时间", prop: "createTime", width: 25 },
    ];
    const { rows } = (await this.list(queryParams)).data;
    return this.downloadExcelService.downloadExcel({
      headers: headers,
      data: rows,
      sheetName: '用户信息',
    });
  }

  // 下载导入模板
  async importTemplate() {
    let headers = [
      { label: "部门编号", prop: "deptId", },
      { label: "登录名称", prop: "userName", },
      { label: "用户昵称", prop: "nickName", },
      { label: "用户邮箱", prop: "email", },
      { label: "手机号码", prop: "phonenumber", },
      { label: "用户性别", prop: "sex", },
      { label: "账号状态", prop: "status", },
    ];
    return this.downloadExcelService.downloadExcel({
      headers: headers,
      data: [],
      sheetName: '用户导入模板',
    });
  }

  // 导入 下载的模板
  async importData(body: ImportExcelDTO) {
    const { files, updateSupport } = body
    // 1.先解析模板
    const result = await this.resolveExcelService.resolvedWebExcelStream(files);
    // 2.获取模板的数据
    const { tableData } = result;
    // 3.循环校验数据，校验通过就插入数据库，校验失败就记录下来，最后返回给前端
    const tipMsg = await this.resolveExcelService.analysisExcelAndWhite({
      tableData,
      updateSupport,
      entityName: this.userEntity,
      headerFields: ['deptId', 'userName', 'nickName', 'email', 'phonenumber', 'sex', 'status'],
      uniqueKey: 'userName'
    });
    return resBuild.success(tipMsg)
  }

  // 表格 - 重置密码
  async resetPsw(body: ResetPwdDto) {
    if (body.userId === 1) {
      throw new Error('超级管理员不允许重置密码')
    }
    if (body.password) {
      body.password = genHashPsw(body.password)
    }
    await this.userEntity.update({
      userId: body.userId
    }, {
      password: body.password
    })
    return resBuild.success('重置成功')
  }

  // 表格 - 修改用户状态
  async changeStatus(body: ChangeStatusDto) {
    await this.userEntity.update({
      userId: body.userId
    }, {
      status: body.status
    })
    return resBuild.success('状态修改成功')
  }

  // 表格 - 分配角色信息及列表
  async authRoleList(userId: number) {
    const detailInfo = await this.userEntity.findOne({
      where: {
        userId: userId
      },
      relations: ['dept', 'roles', 'posts']
    });
    const roleList: any = await this.roleEntity.find({
      where: {
        roleId: Not(1) // 勾选的角色列表要排除超管
      }
    })
    // 如果已有某个角色，打个标记flag=true，返回给前端
    roleList.forEach((item: any) => {
      item.flag = detailInfo.roles.some(role => role.roleId === item.roleId)
    })
    return resBuild.data({
      user: detailInfo,
      roles: roleList
    })
  }

  // 分配角色，提交
  async authRoleUpdate(body: UpdateAuthRoleDTO) {
    // 先判断原先用户与角色是否存在关联
    const isHasRelation = await this.userRoleEntity.findBy({
      userId: body.userId
    })

    // 如果有关联，先删除原有的用户和角色的关联
    if (isHasRelation) {
      await this.userRoleEntity.delete({
        userId: body.userId
      })
    }

    // 然后重新建立关联
    const roleIds = body.roleIds.split(',').map(item => Number(item));
    await this.userConnectWithRole(body.userId, roleIds)
    return resBuild.success()
  }

  // 个人中心 - 获取个人信息
  async profile() {
    const userId = this.ctx.session.userInfo.userId;
    // 获取用户信息、关联：角色、岗位、学生→关联表→队伍
    const userInfo = await this.userEntity.findOne({
      where: {
        userId
      },
      relations: [
        'dept',
        'student.grade',
        'student.major',
        'student.user',
        'student.studentTeam.team.group',
        'student.studentTeam.team.studentTeams.student.user',
        'student.studentTeam.team.studentTeams.student.grade',
        'student.studentTeam.team.studentTeams.student.major',
        'student.studentTeam.team.teamTeachers.teacher.user.dept',
        'teacher',
        'roles',
        'posts']
    });
    const postNames = userInfo.posts.map(item => item.postName)
    const roleNames = userInfo.roles.map(item => item.roleName)

    return resBuild.data({
      data: userInfo,
      postGroup: postNames.join(),
      roleGroup: roleNames.join(),
    })
  }

  async teacherList() {
    const userId = this.ctx.session.userInfo.userId;
    const userInfo = await this.userEntity.findOne({
      where: {
        userId
      },
      relations: [
        'student.major.group',
      ]
    });
    const teacherIds = userInfo.student.major.group.teacherIds.split(',')
    const teacherList = await this.teacherRepo.find({
      where: {
        teacherId: In(teacherIds.map(item => Number(item)))
      }, relations: [
        'user', 'user.dept'
      ]
    })
    return resBuild.data({
      group: userInfo.student.major.group,
      rows: teacherList
    })
  }

  // 个人中心 - 修改头像
  async profileAvatar(file: UploadFileInfo) {
    const originFileName = deepClone(file[0].data)

    // 文件路径中的 \\ 替换为 /
    const pureFileName = originFileName.replace(/\\/g, '/')

    // 去掉/public/之前的字符串前缀
    const newPath = pureFileName.substring(pureFileName.lastIndexOf('/public/'))

    const userId = this.ctx.session.userInfo.userId
    await this.userEntity.update({
      userId
    }, {
      avatar: newPath
    })
    return resBuild.data({
      imgUrl: newPath
    })
  }

  // 个人中心 - 修改密码
  async updatePwd(updatePsw: UpdatePwdDto) {
    const userId = this.ctx.session.userInfo.userId;
    const userInfo = await this.userEntity.findOne({
      where: {
        userId: userId
      }
    });
    if (!userInfo) {
      throw new Error('用户不存在')
    }
    const isEqual = await isEqualPsw(updatePsw.oldPassword, userInfo.password)
    if (!isEqual) {
      throw new Error('旧密码错误')
    }
    if (updatePsw.oldPassword === updatePsw.newPassword) {
      throw new Error('新密码不能与旧密码相同')
    }
    // 新密码加密
    userInfo.password = genHashPsw(updatePsw.newPassword)
    const updateResult = await this.userEntity.save(userInfo);
    if (updateResult) {
      return resBuild.success('修改成功')
    } else {
      throw new Error('修改失败')
    }
  }

  // 个人中心 - 修改用户信息
  async updateProfile(user: UpdateProfileDto) {
    const myUserInfo: User = this.ctx.session.userInfo
    await this.userEntity.update({
      userId: myUserInfo.userId
    }, {
      ...user
    })
    return resBuild.success()
  }

  /**  ------ 下面是辅助函数 ------ */

  // 用户user和岗位post关联
  async userConnectWithPost(userId: number, postIds: number[]) {
    const userPostList = postIds.map(postId => {
      return {
        userId,
        postId,
      }
    })
    await this.userPostEntity.save(userPostList)
  }

  // 用户user和岗位role关联
  async userConnectWithRole(userId: number, roleIds: number[]) {
    const userRoleList = roleIds.map(roleId => {
      return {
        userId,
        roleId,
      }
    })
    await this.userRoleEntity.save(userRoleList)
  }
}

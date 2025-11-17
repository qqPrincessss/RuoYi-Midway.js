import { Rule, RuleType, } from '@midwayjs/validate';
import { PageDTO } from '@module/common/dto/pageDto';

// 查询参数
export class ListUserDTO extends PageDTO {
  @Rule(RuleType.string().optional().allow(null).allow(''))
  userName?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  nickName?: string;

  @Rule(RuleType.number())
  deptId?: number;

  @Rule(RuleType.string().max(11))
  phonenumber?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  status?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  'params[beginTime]'?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  'params[endTime]'?: string;
}

// 新增参数
export class CreateUserDTO {
  @Rule(RuleType.string().required())
  userName: string;

  @Rule(RuleType.string().required())
  nickName: string;

  @Rule(RuleType.string().required())
  password: string;

  @Rule(RuleType.number().allow(null, ""))
  deptId?: number;

  @Rule(RuleType.string().email().allow(null, ""))
  email?: string;

  @Rule(RuleType.string().length(11).allow(null, ""))
  phonenumber?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  status: string;

  @Rule(RuleType.string().allow(null, ""))
  sex?: string;

  @Rule(RuleType.string().max(500).allow(null, ""))
  remark?: string;

  @Rule(RuleType.array())
  postIds?: Array<number>

  @Rule(RuleType.array())
  roleIds?: Array<number>
}

// 修改参数，一般只比新增参数多一个id
export class UpdateUserDTO extends CreateUserDTO {
  @Rule(RuleType.number().required())
  userId: number;
}

// 修改密码
export class UpdatePwdDto {
  @Rule(RuleType.string().required().min(6).max(20))
  oldPassword: string;

  @Rule(RuleType.string().required().min(6).max(20))
  newPassword: string;
}

// 重置密码
export class ResetPwdDto {
  @Rule(RuleType.number().required())
  userId: number;

  @Rule(RuleType.string().required().min(6).max(20))
  password: string;
}

// 改变状态
export class ChangeStatusDto {
  @Rule(RuleType.number().required())
  userId: number;

  @Rule(RuleType.string().required())
  status: string;
}

// 修改用户的个人信息
export class UpdateProfileDto {
  @Rule(RuleType.string().required().min(2).max(20))
  nickName?: string;

  @Rule(RuleType.string().required().email())
  email: string;

  @Rule(RuleType.string().required().length(11))
  phonenumber: string;

  @Rule(RuleType.string().required())
  sex: string;
}

// 分配角色 - 更新
export class UpdateAuthRoleDTO {
  @Rule(RuleType.number().required())
  userId: number;

  @Rule(RuleType.string().required())
  roleIds: string
}

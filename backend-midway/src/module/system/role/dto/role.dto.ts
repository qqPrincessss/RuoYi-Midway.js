import { Rule, RuleType } from "@midwayjs/validate";
import { PageDTO } from "@module/common/dto/pageDto";

// 查询参数
export class ListRoleDTO extends PageDTO {
  @Rule(RuleType.string().optional().allow(null).allow(''))
  roleName?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  roleKey?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  status?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  'params[beginTime]'?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  'params[endTime]'?: string;
}

// 新增参数
export class CreateRoleDTO {
  @Rule(RuleType.string().required())
  roleName: string;

  @Rule(RuleType.string().required().max(20))
  roleKey: string;

  @Rule(RuleType.number().required().min(0))
  roleSort: number;

  @Rule(RuleType.string().required())
  status: string;

  @Rule(RuleType.number().min(0).max(1))
  deptCheckStrictly?: number;

  @Rule(RuleType.number().min(0).max(1))
  menuCheckStrictly?: number;

  @Rule(RuleType.array())
  menuIds?: Array<number>;

  @Rule(RuleType.array())
  deptIds?: Array<number>;

  @Rule(RuleType.string().max(500).allow(null, ""))
  remark?: string;
}

// 修改参数
export class UpdateRoleDTO extends CreateRoleDTO {
  @Rule(RuleType.number().required())
  roleId: number;
}

// 授权用户列表
export class ListAuthUserDTO extends PageDTO {
  @Rule(RuleType.number())
  roleId?: number;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  userName?: string;

  @Rule(RuleType.string().max(11))
  phonenumber?: string;
}

// 取消授权用户
export class CancelAuthUserDTO {
  @Rule(RuleType.number().required())
  roleId: number;

  @Rule(RuleType.number().required())
  userId: number;
}

// 批量 取消授权用户
export class BatchCancelAuthUserDTO {
  @Rule(RuleType.number().required())
  roleId: number;

  @Rule(RuleType.string().required())
  userIds: string;
}

// 批量 绑定授权用户
export class BatchBindAuthUserDTO {
  @Rule(RuleType.number().required())
  roleId: number;

  @Rule(RuleType.string().required())
  userIds: string;
}
export class ChangeStatusDto {
  @Rule(RuleType.number().required())
  roleId: number;

  @Rule(RuleType.string().required())
  status: string;
}

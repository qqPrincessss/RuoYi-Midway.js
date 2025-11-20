import { Rule, RuleType } from "@midwayjs/validate";

export class LoginDTO {

  // 用户名
  @Rule(RuleType.string().required().min(2))
  userName: string;

  // 密码
  @Rule(RuleType.string().required())
  password: string;

  // 验证码、非必填
  @Rule(RuleType.string().allow(null))
  code: string;
}

export class RegisterDTO {

  // 用户名
  @Rule(RuleType.string().required().min(2).max(20))
  userName: string;

  // 密码
  @Rule(RuleType.string().required().min(5).max(20))
  password: string;

  // 确认密码
  @Rule(RuleType.string().required())
  confirmPassword: string;

  // 验证码
  @Rule(RuleType.string().allow(null))
  code: string;

  // uuid
  @Rule(RuleType.string().allow(null))
  uuid: string;
}

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

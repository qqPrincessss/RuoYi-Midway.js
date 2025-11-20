import { Rule, RuleType } from "@midwayjs/validate";

// 获取源代码
export class OriginCodeDTO {
  @Rule(RuleType.string().required())
  moduleName: string; // 模块名称

  @Rule(RuleType.string().required())
  className: string; // 实体名称
}

import { Rule, RuleType } from "@midwayjs/validate";

// 分页请求参数
export class PageDTO {
  @Rule(RuleType.number())
  pageNum?: number;

  @Rule(RuleType.number())
  pageSize?: number;
}

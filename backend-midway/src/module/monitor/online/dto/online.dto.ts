import { Rule, RuleType } from "@midwayjs/validate";
import { PageDTO } from "@dto/common/pageDto";

// 查询参数
export class ListOnlineDTO extends PageDTO {
  @Rule(RuleType.string().optional().allow(null).allow(''))
  ipaddr?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  userName?: string;
}

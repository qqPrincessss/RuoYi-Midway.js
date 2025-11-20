import { Rule, RuleType } from "@midwayjs/validate";
import { PageDTO } from "@module/common/dto/pageDto";
// 查询参数
export class ListLoginInforDTO extends PageDTO {
  @Rule(RuleType.string().optional().allow(null).allow(''))
  ipaddr?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  userName?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  status?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  'params[beginTime]'?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  'params[endTime]'?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  isAsc?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  orderByColumn?: string;
}

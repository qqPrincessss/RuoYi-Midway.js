import { Rule, RuleType } from "@midwayjs/validate";
import { PageDTO } from "@dto/common/pageDto";

// 查询参数
export class ListJobLogDTO extends PageDTO {
  @Rule(RuleType.string().optional().allow(null).allow(''))
  jobName?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  jobGroup?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  status?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  'params[beginTime]'?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  'params[endTime]'?: string;
}

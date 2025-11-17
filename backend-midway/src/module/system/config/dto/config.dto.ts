import { Rule, RuleType } from "@midwayjs/validate";
import { PageDTO } from "@dto/common/pageDto";

// 查询参数
export class ListConfigDTO extends PageDTO {
  @Rule(RuleType.string().optional().allow(null).allow(''))
  configName?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  configKey?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  configType?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  'params[beginTime]'?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  'params[endTime]'?: string;
}

// 新增参数
export class CreateConfigDTO {
  @Rule(RuleType.string().required())
  configName: string;

  @Rule(RuleType.string().required())
  configKey: string;

  @Rule(RuleType.string().required())
  configValue: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  configType?: string;

  @Rule(RuleType.string().max(500).allow(null, ""))
  remark?: string;
}

// 修改参数
export class UpdateConfigDTO extends CreateConfigDTO {
  @Rule(RuleType.number().required())
  configId: number;
}

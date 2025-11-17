import { RuleType, Rule } from "@midwayjs/validate";
import { PageDTO } from "@dto/common/pageDto";
// const required =RuleType.string().required();
// 查询参数
export class ListDictDataDTO extends PageDTO {
  @Rule(RuleType.string().required())
  dictType: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  dictLabel?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  status?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  'params[beginTime]'?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  'params[endTime]'?: string;
}

// 新增参数
export class CreateDictDataDTO {
  @Rule(RuleType.string().required())
  dictLabel: string;

  @Rule(RuleType.string().required())
  dictValue: string;

  @Rule(RuleType.string().required())
  dictType: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  cssClass?: string;

  @Rule(RuleType.string().required())
  listClass: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  isDefault?: string;

  @Rule(RuleType.number().required().min(0))
  dictSort: number;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  status?: string;

  @Rule(RuleType.string().max(500).allow(null, ""))
  remark?: string;
}

// 修改参数
export class UpdateDictDataDTO extends CreateDictDataDTO {
  @Rule(RuleType.number().required())
  dictCode: number;
}

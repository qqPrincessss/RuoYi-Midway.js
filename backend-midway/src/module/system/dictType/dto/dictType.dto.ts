import { Rule, RuleType } from "@midwayjs/validate";
import { PageDTO } from "../common/pageDto";
//查询参数
export class ListDictTypeDTO extends PageDTO {
  @Rule(RuleType.string().optional().allow(null).allow(''))
  dictName?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  dictType?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  status?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  'params[beginTime]'?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  'params[endTime]'?: string;
}

// 新增参数
export class CreateDictTypeDTO {
  @Rule(RuleType.string().required())
  dictName: string;

  @Rule(RuleType.string().required())
  dictType: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  status?: string;

  @Rule(RuleType.string().max(500).allow(null, ""))
  remark?: string;
}

// 修改参数
export class UpdateDictTypeDTO extends CreateDictTypeDTO {

  @Rule(RuleType.number().required())
  dictId: number;
}

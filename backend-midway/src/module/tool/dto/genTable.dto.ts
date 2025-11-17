import { Rule, RuleType } from "@midwayjs/validate";
import { PageDTO } from "@dto/common/pageDto";

export class genTableCloumnUpdate {
  @Rule(RuleType.number().required())
  columnId: number;
  @Rule(RuleType.string().optional().allow(null).allow(''))
  columnComment?: string | null;
  @Rule(RuleType.string().optional().allow(null).allow(''))
  javaType?: string | null;
  @Rule(RuleType.string().optional().allow(null).allow(''))
  javaField?: string | null;
  @Rule(RuleType.string().optional().allow(null).allow(''))
  isInsert?: string | null;
  @Rule(RuleType.string().optional().allow(null).allow(''))
  isEdit?: string | null;
  @Rule(RuleType.string().optional().allow(null).allow(''))
  isList?: string | null;
  @Rule(RuleType.string().optional().allow(null).allow(''))
  isQuery?: string | null;
  @Rule(RuleType.string().optional().allow(null).allow(''))
  queryType?: string | null;
  @Rule(RuleType.string().optional().allow(null).allow(''))
  isRequired?: string | null;
  @Rule(RuleType.string().optional().allow(null).allow(''))
  htmlType?: string | null;
  @Rule(RuleType.string().optional().allow(null).allow(''))
  dictType?: string | null;
}
// 查询参数
export class ListGenTableDTO extends PageDTO {
  @Rule(RuleType.string().optional().allow(null).allow(''))
  tableName?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  tableComment?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  'params[beginTime]'?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  'params[endTime]'?: string;
}

// 新增参数
export class CreateGenTableDTO {
  @Rule(RuleType.string().optional().allow(null).allow(''))
  tableName?: string;
}

// 修改参数
export class UpdateGenTableDTO extends CreateGenTableDTO {
  @Rule(RuleType.number().required())
  tableId: number;
  @Rule(RuleType.string().optional().allow(null).allow(''))
  tableName?: string | null;
  @Rule(RuleType.string().optional().allow(null).allow(''))
  tableComment?: string | null;
  @Rule(RuleType.string().optional().allow(null).allow(''))
  className?: string | null;
  @Rule(RuleType.string().optional().allow(null).allow(''))
  functionAuthor?: string | null;
  @Rule(RuleType.string().optional().allow(null).allow(''))
  remark?: string | null;
  @Rule(RuleType.string().optional().allow(null).allow(''))
  tplCategory?: string | null;
  @Rule(RuleType.string().optional().allow(null).allow(''))
  packageName?: string | null;
  @Rule(RuleType.string().optional().allow(null).allow(''))
  moduleName?: string | null;
  @Rule(RuleType.string().optional().allow(null).allow(''))
  businessName?: string | null;
  @Rule(RuleType.string().optional().allow(null).allow(''))
  functionName?: string | null;
  @Rule(RuleType.string().optional().allow(null).allow(''))
  genType?: string | null;
  @Rule(RuleType.array().optional())
  columns?: genTableCloumnUpdate[];
  @Rule(RuleType.string().optional().allow(null).allow(''))
  tplWebType?: string | null;
}
export class GenDbTableList extends PageDTO {
  @Rule(RuleType.string().optional().allow(null).allow(''))
  tableName?: string;
  @Rule(RuleType.string().optional().allow(null).allow(''))
  tableComment?: string;
}

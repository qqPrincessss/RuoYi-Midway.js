import { RuleType, Rule } from "@midwayjs/validate";
import { PageDTO } from "../common/pageDto";

// 查询参数
export class ListDeptDTO extends PageDTO {
  @Rule(RuleType.string().optional().allow(null).allow(''))
  deptName?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  status?: string;
}

// 新增参数
export class CreateDeptDTO {
  @Rule(RuleType.number().required())
  parentId: number;

  @Rule(RuleType.string().required())
  deptName: string;

  @Rule(RuleType.number().required().min(0))
  orderNum: number;

  @Rule(RuleType.string().max(20).allow(null, ""))
  leader?: string;

  @Rule(RuleType.string().length(11).allow(null, ""))
  phone?: string;

  @Rule(RuleType.string().email().allow(null, ""))
  email?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  status?: string;
}

// 修改参数
export class UpdateDeptDTO extends CreateDeptDTO {
  @Rule(RuleType.number().required())
  deptId: number;
}
import { Rule, RuleType } from "@midwayjs/validate";
import { PageDTO } from "@module/common/dto/pageDto";

// 查询参数
export class ListPostDTO extends PageDTO {
  @Rule(RuleType.string().optional().allow(null).allow(''))
  postCode?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  postName?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  status?: string;
}

// 新增参数
export class CreatePostDTO {
  @Rule(RuleType.string().required())
  postCode: string;

  @Rule(RuleType.string().required())
  postName: string;

  @Rule(RuleType.number().required().min(0))
  postSort: number;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  status?: string;

  @Rule(RuleType.string().max(500).allow(null, ""))
  remark: string;
}

// 修改参数
export class UpdatePostDTO extends CreatePostDTO {
  @Rule(RuleType.number().required())
  postId: number;
}

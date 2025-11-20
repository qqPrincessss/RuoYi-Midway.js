import { RuleType, Rule } from '@midwayjs/validate';
import { PageDTO } from '@module/common/dto/pageDto';
// 查询参数
export class ListMenuDTO extends PageDTO {
  @Rule(RuleType.string().optional().allow(null).allow(''))
  menuName?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  status?: string;
}

// 新增参数
export class CreateMenuDTO {
  @Rule(RuleType.number().required())
  parentId: number;

  @Rule(RuleType.string().required())
  menuType: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  icon: string;

  @Rule(RuleType.string().required())
  menuName: string;

  @Rule(RuleType.number().required().min(0))
  orderNum: number;

  @Rule(RuleType.number().required())
  isFrame: number;

  @Rule(RuleType.optional())
  component?: string;

  @Rule(RuleType.optional())
  path: string;

  @Rule(RuleType.optional())
  perms?: string;

  @Rule(RuleType.optional())
  query?: string;

  @Rule(RuleType.number().required())
  isCache: number;

  @Rule(RuleType.string().required())
  status?: string;

  @Rule(RuleType.string().required())
  visible?: string;
}

// 修改参数
export class UpdateMenuDTO extends CreateMenuDTO {

  @Rule(RuleType.number().required())
  menuId: number;
}

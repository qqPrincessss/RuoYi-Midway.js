import { Rule, RuleType } from "@midwayjs/validate";
import { PageDTO } from "@module/common/dto/pageDto";

// 查询参数
export class ListNoticeDTO extends PageDTO {
  @Rule(RuleType.string().optional().allow(null).allow(''))
  noticeTitle?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  createBy?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  noticeType?: string;
}

// 新增参数
export class CreateNoticeDTO {
  @Rule(RuleType.string().required())
  noticeTitle: string;

  @Rule(RuleType.string().required())
  noticeType: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  status?: string;

  @Rule(RuleType.string().max(2000))
  noticeContent: string;
}

// 修改参数
export class UpdateNoticeDTO extends CreateNoticeDTO {
  @Rule(RuleType.number().required())
  noticeId: number;
}

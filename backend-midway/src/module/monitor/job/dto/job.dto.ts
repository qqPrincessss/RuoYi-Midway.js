import { Rule, RuleType } from "@midwayjs/validate";
import { PageDTO } from "@dto/common/pageDto";

// 查询参数
export class ListJobDTO extends PageDTO {
  @Rule(RuleType.string().optional().allow(null).allow(''))
  jobName?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  jobGroup?: string;

  @Rule(RuleType.string().optional().allow(null).allow(''))
  status?: string;
}

// 新增参数
export class CreateJobDTO {
  @Rule(RuleType.string().required().max(100))
  jobName: string;

  @Rule(RuleType.string().max(100).allow(null, ""))
  jobGroup?: string;

  @Rule(RuleType.string().required().max(500))
  invokeTarget: string;

  @Rule(RuleType.string().required().max(255))
  cronExpression: string;

  @Rule(RuleType.number().allow(null))
  misfirePolicy?: number;

  @Rule(RuleType.number().required())
  concurrent: number;

  @Rule(RuleType.string().required())
  status: string;
}

// 修改参数
export class UpdateJobDTO extends CreateJobDTO {
  @Rule(RuleType.number().required())
  jobId: number;
}

// 改变状态
export class ChangeStatusDto {
  @Rule(RuleType.number().required())
  jobId: number;

  @Rule(RuleType.string().required())
  status: string;
}

// 执行一次
export class RunJobDto {
  @Rule(RuleType.number().required())
  jobId: number;

  @Rule(RuleType.string().required())
  jobGroup: string;
}

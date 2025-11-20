import { Rule, RuleType } from "@midwayjs/validate";
import { UploadStreamFileInfo } from '@midwayjs/busboy';

// 导入excel数据校验
export class ImportExcelDTO {
  @Rule(RuleType.required())
  files: UploadStreamFileInfo; // 导入的流式文件格式

  @Rule(RuleType.boolean().required())
  updateSupport: boolean;  // 是否更新已经存在的用户数据 true / false
}

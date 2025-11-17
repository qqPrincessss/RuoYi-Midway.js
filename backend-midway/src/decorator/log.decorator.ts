import { savePropertyMetadata } from '@midwayjs/core';
import { BusinessType } from "@utils/enum";

export const OPERATION_META_KEY = 'operation:type'


interface logInfoType {
  title: string, // 操作日志标题
  businessType: number, // 操作类型，详见"@utils/enum"
}

export { BusinessType }

// 操作日志
export const Log = (logInfo: logInfoType): MethodDecorator => {
  return (target, propertyKey, descriptor) => {
    savePropertyMetadata(OPERATION_META_KEY, logInfo, target, propertyKey);
  };
}

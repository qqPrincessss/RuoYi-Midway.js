import { savePropertyMetadata } from '@midwayjs/core';

export const Auth_META_KEY = 'auth:name'

// 权限装饰器
export function Auth(authName: string): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    savePropertyMetadata(Auth_META_KEY, authName, target, propertyKey);
  };
}
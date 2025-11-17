import { clone } from "es-toolkit";
import * as Lodash from 'lodash';

// 获取操作人，新建或修改时设置该值
export const getOperator = (ctx: any) => {
  console.log(ctx.request.header.cookie);
  
  return ctx.request.header.cookie.split('; ').find((item: any) => item.startsWith('userName='))?.split('=')[1]
}
// 克隆
export const deepClone = (obj: any) => {
  return clone(obj)
}
/**
 * @desc: 删除数组中的指定字段，主要用于删除树形结构中不需要的字段，主要是parentId字段，其他也可以自定义值
 * @param {*} data<array> 数据源
 * @param {*} name<string> 字段名
 * @param {*} children 如果数组中存在children字段，则递归删除children字段
 */
export const removeTreeFields = (data: any[], name: string = 'parentId', children: any = 'children') => {
  data.forEach((item) => {
    if (item[name] || item[name] == 0) {
      delete item[name];
    }
    if (children && item[children]) {
      removeTreeFields(item[children], name, children);
    }
  })
  return data
}

  /**
   * 将字符串转换为小驼峰命名法
   * @param {string} str - 输入的字符串，使用下划线分隔
   * @returns {string} - 转换后的小驼峰命名法字符串
   */
  export const toCamelCase = (str: string): string => {
    return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
  }

   /**
   * 将字符串转换为大驼峰命名法
   * @param {string} str - 输入的字符串，使用下划线分隔
   * @returns {string} - 转换后的大驼峰命名法字符串
   */
  export const toPascalCase = (str: string): string => {
    return str[0].toUpperCase() + toCamelCase(str).slice(1);
  }
/**
 * 校验数组是否包含指定值
 *
 * @param arr 数组
 * @param targetValue 值
 * @return 是否包含
 */

export const arraysContains = (array: string[], value: string): boolean => {
  return array.includes(value);
}
/**
 * 获取字段长度
 *
 * @param columnType 列类型
 * @return 截取后的列类型
 */

export const getColumnLength = (columnType: string): number => {
  const match = columnType.match(/\((\d+)\)/);
  return match ? parseInt(match[1], 10) : 0;
}
/**
 * 将字符串的首字母大写
 * @param {string} str - 输入的字符串
 * @returns {string} - 首字母大写后的字符串
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
/**
 * 判断值是否为null undefined 空字符串 NaN
 */
export const isEmpty = (value: any) => {
  return value === null || value === undefined || value === '' || value === 'NaN';
}

/**
 * 深拷贝
 * @param obj
 * @returns
 */
export const DeepClone = <T>(obj: T): T => {
    return Lodash.cloneDeep(obj);
}
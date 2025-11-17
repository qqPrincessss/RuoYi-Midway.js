import { Not } from "typeorm";
import * as Lodash from 'lodash';
/**
 * @desc 检查数据库中是否存在指定的键值对
 * @param {*} entity<any> 数据库实体类
 * @param {*} keyName<string> 键名
 * @param {*} keyValue<string> 键值
 * */
export const checkIfExsit = async (entity: any, keyName: string, keyValue: string) => {
  const res = await entity.findOneBy({
    [keyName]: keyValue,
  });
  if (res) {
    throw new Error(`${keyValue}已存在`);
  }
}
/**
 * @desc: 修改的时候，判断是否有重复值，除去本身和其他所有数据对比
 * @param {*} entity<any> 数据库实体类
 * @param {*} keyName<string> 键名
 * @param {*} keyValue<string> 键值
 * */
export const checkUpdateKeyRepeat = async (entity: any, keyName: string, keyValue: string) => {
  const allDataExceptCurrent = await entity.find({
    where: {
      [keyName]: Not(keyValue)
    },
    select: [keyName]
  });
  const isExist = allDataExceptCurrent.some(item => item[keyName] === keyValue);
  if(isExist) {
    throw new Error(`已存在字段"${keyValue}"的记录`);
  }
}
/**
 * 分页
 * @param data
 * @param pageSize
 * @param pageNum
 * @returns
 */
export const Paginate = (data: { list: Array<any>; pageSize: number; pageNum: number }, filterParam: any) => {
  // 检查 pageSize 和 pageNumber 的合法性
  if (data.pageSize <= 0 || data.pageNum < 0) {
    return [];
  }

  // 将数据转换为数组
  let arrayData = Lodash.toArray(data.list);

  if (Object.keys(filterParam).length > 0) {
    arrayData = Lodash.filter(arrayData, (item) => {
      const arr = [];
      if (filterParam.ipaddr) {
        arr.push(Boolean(item.ipaddr.includes(filterParam.ipaddr)));
      }

      if (filterParam.userName && item.userName) {
        arr.push(Boolean(item.userName.includes(filterParam.userName)));
      }
      return !Boolean(arr.includes(false));
    });
  }

  // 获取指定页的数据
  const pageData = arrayData.slice((data.pageNum - 1) * data.pageSize, data.pageNum * data.pageSize);

  return pageData;
}
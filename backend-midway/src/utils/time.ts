import dayjs from 'dayjs';
/**
 * @desc: 格式化时间YYYY-MM-DD HH:mm:ss
 * @param {*} cellValue<string | number | Date | null> 时间
 * @return {*} 格式化后的时间字符串
 * */
export const formatDate = (cellValue: string | number | Date | null): any => {
  if (cellValue == null || cellValue == "") return "";
  return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss');
}

/**
 * @desc: 格式化时间YYYY-MM-DD
 * @param {*} cellValue<string | number | Date | null> 时间
 * @return {*} 格式化后的时间字符串
 * */
export const formatYmd = (cellValue: string | number | Date | null): any => {
  if (cellValue == null || cellValue == "") return "";
  return dayjs(cellValue).format('YYYY-MM-DD');
}

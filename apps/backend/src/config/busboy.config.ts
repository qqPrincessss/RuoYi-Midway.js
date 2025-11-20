import { join } from "path";
import { uploadWhiteList } from '@midwayjs/busboy';

// 上传文件的类型
enum FileType {
  FILE = 'file', // 文件类型
  STREAM = 'stream', // 流式文件
}

/**
* @desc: 文件上传配置项，目前开发环境和生成环境配置相同，所以提取
* @author: yanrui
* @time: 2024-09-12 20:52:28
*/
export const busboyConfig = {
  mode: FileType.FILE,
  // fileSize: number, 单位为 byte，默认设置为10M
  limits: {
    fileSize: 1024 * 1024 * 10
  },
  // tmpdir: string，上传的文件临时存储路径
  tmpdir: join(__dirname, '../../public'),
  // cleanTimeout: number，上传的文件在临时目录中多久之后自动删除，默认为 5 分钟
  cleanTimeout: 0, // 设置为 0 则视为不开启自动清理功能。
  // whitelist: string[]，文件扩展名白名单，假如xlsx后缀的解析
  whitelist: uploadWhiteList.concat('.xlsx').concat('.xls'),
}

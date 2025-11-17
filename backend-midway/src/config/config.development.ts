import { MidwayConfig } from '@midwayjs/core';
import { busboyConfig } from './busboy.config';

// 加载 .env 文件
require('dotenv').config({ path: '.env.development' });


export default {
  keys: '1',
  koa: {
    port: 5277,
    // 添加body parser配置以支持UTF-8
    bodyParser: {
      enableTypes: ['json', 'form', 'text'],
      encoding: 'utf8',
      formLimit: '56kb',
      jsonLimit: '1mb',
      textLimit: '1mb',
    },
  },
  //数据库配置
  typeorm: {
    dataSource: {
      default: {
        type: 'postgres',
        host: process.env.DB_HOST, //数据库地址
        port: Number(process.env.DB_PORT), //数据库端口
        username: process.env.DB_USER, //数据库用户名
        password: process.env.DB_PASSWORD, //数据库密码
        database: process.env.DB_NAME, //数据库名称
        synchronize: false, // 是否自动同步数据库结构
        logging: ['error', 'warn'], // 降噪：只输出错误和警告
        entities: [
          '**/module/**/entites/*.{ts,js}' , // 通配加后缀匹配
        ],
      },
    },
  },
  validate: {
    enable: true,
    validationOptions: {
      allowUnknown: true, // 允许未定义的字段
      abortEarly: true,
      stripUnknown: true, // 剔除参数中的未定义属性
    }
  },
  //jwt 配置
  jwt: {
    secret: 'b6babdff33befeb0dedc098f18710092',
    expiresIn: '1d', // 过期时间 一天
  },
  // 文件上传配置
  busboy: {
    ...busboyConfig,
    // 添加UTF-8编码支持
    encoding: 'utf8',
    // 设置字段编码
    defCharset: 'utf8',
  },

  //redis配置
  redis: {
    client: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
      db: Number(process.env.REDIS_DB),
      keepAlive: 10000,
    },
  },
  cors: {
    origin: '*', // 跨域
  },
} as MidwayConfig;


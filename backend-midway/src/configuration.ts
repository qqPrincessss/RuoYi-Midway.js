import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as orm from '@midwayjs/typeorm';
import * as captcha from '@midwayjs/captcha';
import * as jwt from '@midwayjs/jwt';
import * as busboy from '@midwayjs/busboy'; // 文件上传
import * as staticFile from '@midwayjs/static-file'; // 静态资源
import * as axios from '@midwayjs/axios';
import * as redis from '@midwayjs/redis';
import { join } from 'path';
import { ErrorFilter } from './filter/error.filter';
// import { DefaultErrorFilter } from './filter/default.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { JwtMiddleware } from './middleware/jwt.middleware'; // token校验
// import { EncryptMiddleware } from "./middleware/encrypt.middleware"; // 接口加密
import { AuthGuard } from "./gaurd/auth.guard"; // 权限校验守卫
import { LogGuard } from "./gaurd/log.guard";
import * as swagger from '@midwayjs/swagger';

@Configuration({
  imports: [
    koa,
    validate,
    orm,
    captcha,
    jwt,
    busboy,
    staticFile,
    swagger,
    axios,
    redis,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;


  async onReady() {
    // add middleware
    // this.app.useMiddleware([JwtMiddleware, EncryptMiddleware, ReportMiddleware]);
    this.app.useMiddleware([JwtMiddleware, ReportMiddleware]);
    // add filter
    this.app.useFilter([ErrorFilter]);
    // guard守卫
    this.app.useGuard([AuthGuard, LogGuard]);
  }
}

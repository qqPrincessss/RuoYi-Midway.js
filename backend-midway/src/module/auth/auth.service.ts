import { Provide, Inject, Config } from '@midwayjs/core';
import { AuthDao } from '../../dao/auth/auth.dao';
import { JwtService } from '@midwayjs/jwt';
import { Context } from '@midwayjs/koa';
import { RedisService } from '@midwayjs/redis';
import { LoginDTO } from '../../dto/system/loginDto';
import { UserService } from '../system/user.service';
import { CaptchaService } from '@midwayjs/captcha';
import { HttpService } from '@midwayjs/axios';
import { isEqualPsw } from '../../utils/password';
import { resBuild } from '../../utils/resBuild';
import { formatDate } from '../../utils/time';
import { getIp } from '../../utils/device';
import * as useragent from 'useragent';
import { RedisEnum } from '../../utils/enum';
import { Decrypt } from '../../utils/aes';
import { uuidv7 } from 'uuidv7';

@Provide()
export class AuthService {
  @Inject()
  AuthDao: AuthDao;

  @Inject()
  jwtService: JwtService;

  @Config('jwtConfig')
  jwtConfig;

  @Inject()
  ctx: Context;

  @Inject()
  redisService: RedisService;

  @Inject()
  userService: UserService;

  @Inject()
  captchaService: CaptchaService;

  @Inject()
  httpService: HttpService;


  // 生成验证码
  async captchaImage() {
    const temp = await this.redisService.get(`${RedisEnum.SYS_CONFIG_KEY}sys.account.captchaEnabled`);
    const isCaptchaEnabled = temp === null ? true : JSON.parse(temp)
    if (JSON.parse(isCaptchaEnabled)) {
      // 如果开启了验证码，则生成验证码
      const { id, imageBase64 } = await this.captchaService.formula({ noise: 1 }); // noise是干扰项条数，具体配置可看文档
      // 把校验id存起来，和后面的登录时的参数、对比值是否一致
      this.ctx.session.codeId = id;
      return {
        code: 200,
        message: '操作成功',
        img: imageBase64, // 此处直接返回base64图片，和若依的base64位字符串不一样
        captchaEnabled: isCaptchaEnabled, // 是否开启验证码校验
      }
    } else {
      // 如果关闭了验证码，则返回captchaEnabled值为false
      return resBuild.data({
        captchaEnabled: isCaptchaEnabled, // 是否开启验证码校验
      })
    }
  }

  //登录接口
  async login(user: LoginDTO) {

    // 新的登录方式（从login.service.ts迁移过来的逻辑）
    const { userName, password, code } = user as any;

    // 先查询用户表是否有这个用户名
    const userInfoTemp = await this.AuthDao.getUserByUserName(userName);

    // 如果缓存获取为空，默认开启，否则按缓存走
    const temp = await this.redisService.get(`${RedisEnum.SYS_CONFIG_KEY}sys.loginLog.enable`)
    const isUseLoginLog = temp === null ? true : JSON.parse(temp)
    if (isUseLoginLog) {
      setTimeout(async () => {
        await this.recordLog(logData);
      }, 500)
    }
    let logData: any = await this.getLogData(userName);
    // 如果用户存在，进行下一步，否则提示不存在用户
    if (userInfoTemp) {
      // 如果开启了验证码，验证码是否相等
      if (this.ctx.session.isCaptchaEnabled) {
        const isEqualCode: boolean = await this.captchaService.check(this.ctx.session.codeId, code);
        if (!isEqualCode) {
          throw new Error('验证码错误')
        }
      }

      // 密码是否相等
      const isEqualPswFlag: boolean = await isEqualPsw(password, userInfoTemp.password.trim());

      if (!isEqualPswFlag) {
        throw new Error('账号或密码错误')
      }
    } else {
      throw new Error('用户不存在')
    }
    const tokenId: string = uuidv7();
    // 通过校验后，设置本地缓存、返回token
    this.ctx.session.userInfo = userInfoTemp;
    this.ctx.session.userInfo.tokenId = tokenId;
    const token: string = await this.jwtService.sign({
      userId: userInfoTemp.userId,
      userName: userInfoTemp.userName,
    })

    // 设置token相关配置，更多配置请自行查阅，这个一般够用了
    this.ctx.cookies.set('token', token, {
      maxAge: 24 * 60 * 60 * 1000, // 有效期为一天
      httpOnly: true, // 只能通过 HTTP 请求访问，不能通过 JavaScript 访问
      signed: true, // 签名 cookie，防止篡改
      overwrite: true, // 如果已有同名 cookie，则覆盖
    })

    // 设置 userName（供前端和服务端非敏感读取）
    this.ctx.cookies.set('userName', userInfoTemp.userName, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,
      overwrite: true,
      // 如需限制作用域，可加：path: '/', domain: 'your-domain.com'
    })
    logData.status = '0';
    logData.tokenId = tokenId;
    await this.redisService.set(`${RedisEnum.LOGIN_TOKEN_KEY}${tokenId}`, JSON.stringify(logData), 'EX', 24 * 60 * 60);
    return resBuild.data({
      token: token
    })
  }

  /** 退出登录 */
  async logout() {
    this.ctx.cookies.set('token', '', {
      maxAge: 0,
      httpOnly: true,
      signed: true,
      overwrite: true,
    })

    // 同步清理 userName
    this.ctx.cookies.set('userName', '', {
      maxAge: 0,
      httpOnly: false,
      overwrite: true,
    })
    const tokenId = this.ctx.session.userInfo.tokenId;
    this.ctx.session.userInfo = null;
    await this.redisService.del(`${RedisEnum.LOGIN_TOKEN_KEY}${tokenId}`);
    return resBuild.success();
  }
  async getLogData(userName: string) {
    const webAgent = this.ctx.request.header['user-agent']
    const temp = await this.redisService.get(`${RedisEnum.SYS_CONFIG_KEY}sys.interface.enable`)
    const isOpenCrypt = temp === null ? false : JSON.parse(temp)

    const respBody = this.ctx.response.body
    const isEncryptedResponse = isOpenCrypt && typeof respBody === 'string'
    const body: any = isEncryptedResponse ? JSON.parse(Decrypt(respBody)) : respBody
    const ip = getIp(this.ctx)
    let loginLocation: string = ''

    // 如果拆分后长度为4，则是ipv4地址，且不带::本地
    if (ip && !ip.includes('::') && ip.split('.').length === 4) {
      // 如果拆分后长度为4，则是ipv4地址，且不带::本地
      if (ip && !ip.includes('::') && ip.split('.').length === 4) {
        const tempIpInfo = await this.httpService.get(`https://opendata.baidu.com/api.php?query=${ip}&co=&resource_id=6006&oe=utf8`);
        loginLocation = `${tempIpInfo.data.data[0].location}`.replace('省', ' ').replace('市', '')
      }
    }
    let logData = {};
    if (webAgent) {
      const myAgent = useragent.parse(this.ctx.request.header['user-agent']);
      const os = myAgent.os.toJSON().family;
      const browser = myAgent.toAgent();
      // 登录时记录登录日志
      logData = {
        userName,
        ipaddr: ip,
        loginLocation,
        browser,
        os,
        status: body?.code === 200 ? '0' : '1',
        message: body?.message || '',
        loginTime: formatDate(new Date())
      }
    } else {
      // 登录时记录登录日志
      logData = {
        userName,
        ipaddr: ip,
        loginLocation,
        browser: null,
        os: null,
        status: body?.code === 200 ? '0' : '1',
        message: body?.message || '',
        loginTime: formatDate(new Date())
      }
    }
    return logData;
  }

  // 记录登录日志
  // 位于类 AuthService 中的 recordLog 方法
  async recordLog(logData: any) {
    console.log('logData', logData)
    await this.AuthDao.saveLoginLog(logData)
  }
}

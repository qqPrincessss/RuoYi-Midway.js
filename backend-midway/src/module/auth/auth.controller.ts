import { Inject, Controller,  Post,Body, Get, Query } from '@midwayjs/core';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery } from '@midwayjs/swagger';
import { LoginDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { GetRouterService } from "./getRouters.service";
import { Context } from '@midwayjs/koa';
import { OriginCodeDTO } from "../common/originCode/dto/originCode.dto";
import { GetCodeService } from "../common/originCode/originCode.service";
import { UserInfoService } from "./userInfo.service";

@ApiTags('认证管理')
@Controller('/')
export class AuthController {
  @Inject()
  ctx: Context;
  @Inject()
  authService: AuthService;
  @Inject()
  getRouterService: GetRouterService;
  @Inject()
  userInfoService: UserInfoService;
  @Inject()
  getCodeService: GetCodeService;
    // 生成验证码，转64位输出
  @ApiOperation({ summary: '生成验证码', description: '生成验证码图片，转64位输出' })
  @ApiResponse({ status: 200, description: '成功生成验证码' })
  @Get('/captchaImage')
  async generateCode() {
    return await this.authService.captchaImage()
  }
  /**
   *@POST /login
   * @param user
   * @returns
   */
  @ApiOperation({ summary: '用户登录', description: '用户登录接口' })
  @ApiBody({ type: LoginDTO, description: '登录信息' })
  @ApiResponse({ status: 200, description: '登录成功' })
  @Post('/login')
  async userLogin(@Body() user: LoginDTO) {
      return await this.authService.login(user);
  }
  /** 退出登录 */
  @ApiOperation({ summary: '退出登录', description: '用户退出登录' })
  @ApiResponse({ status: 200, description: '退出成功' })
  @Post('/logout')
  async logout() {
    return await this.authService.logout();
  }
    // 获取路由表
  @ApiOperation({ summary: '获取路由表', description: '获取用户可访问的路由表' })
  @ApiResponse({ status: 200, description: '成功获取路由表' })
  @Get('/getRouters')
  async getRouters() {
    return await this.getRouterService.getRouters();
  }

    // 获取用户信息
  @ApiOperation({ summary: '获取用户信息', description: '获取当前登录用户的详细信息' })
  @ApiResponse({ status: 200, description: '成功获取用户信息' })
  @Get('/getInfo')
  async getInfo(): Promise<any> {
    return this.userInfoService.getUserInfo();
  }
   // 获取源代码
  @ApiOperation({ summary: '获取源代码', description: '获取源代码信息' })
  @ApiQuery({ type: OriginCodeDTO, description: '查询参数' })
  @ApiResponse({ status: 200, description: '成功获取源代码' })
  @Get('/getOriginCode')
  async getCode(@Query() body: OriginCodeDTO) {
    return this.getCodeService.getCode(body);
  }
}

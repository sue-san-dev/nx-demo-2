import { BadRequestException, Body, Controller, Post, Res } from '@nestjs/common';
import { ApiAuthService } from './api-auth.service';
import { ReqUrlUtil } from '@nx-demo/shared-utils';
import { ILoginPayload, IUser } from '@nx-demo/shared-domain';
import { Response } from 'express';

@Controller()
export class ApiAuthController {

  constructor(
    private apiAuthService: ApiAuthService,
  ) { }

  /**
   * 認証
   * @param response 
   * @returns 
   */
  @Post(ReqUrlUtil.auth.root)
  async auth(
    @Res({ passthrough: true }) response: Response,
  ): Promise<IUser> {
    

    const tokens = await this.apiAuthService.getAccessToken(user);
    // cookieにtokenセット
    response.cookie('accessToken', tokens.accessToken, { httpOnly: true, secure: true });
    response.cookie('refreshToken', tokens.refreshToken, { httpOnly: true, secure: true });

    // passwordフィールドを除外して返却
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  /**
   * ログイン
   * @param payload 
   * @param response 
   * @returns 
   */
  @Post(ReqUrlUtil.auth.login)
  async login(
    @Body() payload: ILoginPayload,
    @Res({ passthrough: true }) response: Response,
  ): Promise<IUser> {
    const user = await this.apiAuthService.getUserByEmail(payload.email);
    if (user == null) throw new BadRequestException('ユーザー名またはパスワードが無効です');

    const valid = await this.apiAuthService.validateUser(payload.password, user);
    if (!valid) throw new BadRequestException('ユーザー名またはパスワードが無効です');

    const tokens = await this.apiAuthService.getAccessToken(user);
    // cookieにtokenセット
    response.cookie('accessToken', tokens.accessToken, { httpOnly: true, secure: true });
    response.cookie('refreshToken', tokens.refreshToken, { httpOnly: true, secure: true });

    // passwordフィールドを除外して返却
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  /**
   * ログアウト
   * @param response 
   */
  @Post(ReqUrlUtil.auth.logout)
  async logout(
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {

    // cookieのtoken削除
    response.clearCookie('accessToken', { httpOnly: true, secure: true });
    response.clearCookie('refreshToken', { httpOnly: true, secure: true });
  }

  /**
   * ユーザ新規登録
   * @returns 
   */
  @Post(ReqUrlUtil.auth.signUp)
  async signUp(): Promise<boolean> {
    return true;
  }
}

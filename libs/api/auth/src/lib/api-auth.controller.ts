import { BadRequestException, Body, Controller, Post, Res } from '@nestjs/common';
import { ApiAuthService } from './api-auth.service';
import { ReqUrlUtil } from '@nx-demo/shared-utils';
import { ILoginPayload, IUser } from '@nx-demo/shared-domain';
import { Response } from 'express';
import { ReqUserId } from '@nx-demo/api-shared-decorators';

@Controller()
export class ApiAuthController {

  constructor(
    private apiAuthService: ApiAuthService,
  ) { }

  /**
   * 認証
   * @param reqUserId 
   * @param response 
   * @returns 
   */
  @Post(ReqUrlUtil.auth.root)
  async auth(
    @ReqUserId() reqUserId: number | null,
    @Res({ passthrough: true }) response: Response,
  ): Promise<IUser | null> {
    const user = reqUserId ? await this.apiAuthService.getUserById(reqUserId) : null;

    await this.#setOrClearCookie(response, user);
    return user;
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

    await this.#setOrClearCookie(response, user);
    // userからpasswordフィールドを除外して返却
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
    await this.#setOrClearCookie(response, null);
  }

  /**
   * ユーザ新規登録
   * @returns 
   */
  @Post(ReqUrlUtil.auth.signUp)
  async signUp(): Promise<boolean> {
    // 未実装
    return true;
  }

  /**
   * cookieのセット/クリア
   * @param response 
   * @param user 
   * @returns 
   */
  async #setOrClearCookie(response: Response, user: IUser | null) {
    if (user) {
      const { accessToken, refreshToken } = await this.apiAuthService.getTokens(user);
      response.cookie('accessToken', accessToken.value, { httpOnly: true, secure: true, expires: accessToken.expires });
      response.cookie('refreshToken', refreshToken.value, { httpOnly: true, secure: true, expires: refreshToken.expires });
      response.cookie('isAuthenticated', 'true', { secure: true });
    } else {
      response.clearCookie('accessToken');
      response.clearCookie('refreshToken');
      response.clearCookie('isAuthenticated');
    }
  }
}

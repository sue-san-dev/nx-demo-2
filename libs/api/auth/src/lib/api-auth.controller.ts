import { BadRequestException, Body, Controller, Post, Res } from '@nestjs/common';
import { ApiAuthService } from './api-auth.service';
import { ReqUrlUtil } from '@nx-demo/shared-utils';
import { ILoginPayload, IUser } from '@nx-demo/shared-domain';
import { Response } from 'express';
import { ReqUserId } from '@nx-demo/api-shared-decorators';
import { User } from '@prisma/client';

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
    if (reqUserId == null) return null;

    const user = await this.apiAuthService.getUserById(reqUserId);
    if (user == null) return null;

    await this.#setTokenToCookie(user, response);
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

    await this.#setTokenToCookie(user, response);
    return this.#getUserWithoutPassword(user);
  }

  /**
   * ログアウト
   * @param response 
   */
  @Post(ReqUrlUtil.auth.logout)
  logout(
    @Res({ passthrough: true }) response: Response,
  ): void {
    this.#removeTokenFromCookie(response);
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
   * tokenをcookieにセット
   * @param user 
   * @param response 
   * @returns 
   */
  async #setTokenToCookie(user: IUser, response: Response) {
    const tokens = await this.apiAuthService.getAccessToken(user);
    // cookieにtokenセット
    response.cookie('accessToken', tokens.accessToken, { httpOnly: true, secure: true });
    response.cookie('refreshToken', tokens.refreshToken, { httpOnly: true, secure: true });
  }

  /**
   * cookieからtokenを削除
   * @param response 
   * @returns 
   */
  #removeTokenFromCookie(response: Response) {
    // cookieのtoken削除
    response.clearCookie('accessToken', { httpOnly: true, secure: true });
    response.clearCookie('refreshToken', { httpOnly: true, secure: true });
  }

  /**
   * userからpasswordフィールドを除外して返却
   * @param user 
   * @returns 
   */
  #getUserWithoutPassword(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

import { BadRequestException, Body, Controller, Post, Res } from '@nestjs/common';
import { ApiAuthService } from './api-auth.service';
import { ReqUrlUtil } from '@nx-demo/shared-utils';
import { ILoginPayload } from '@nx-demo/shared-domain';
import { Response } from 'express';

@Controller()
export class ApiAuthController {

  constructor(
    private apiAuthService: ApiAuthService,
  ) { }

  @Post(ReqUrlUtil.auth.login)
  async login(@Body() { email, password }: ILoginPayload, @Res({ passthrough: true }) response: Response): Promise<boolean> {
    console.log('★')
    const user = await this.apiAuthService.getUserByEmail(email);
    if (user == null) throw new BadRequestException('ユーザが見つかりません');

    const valid = await this.apiAuthService.validateUser(user, password);
    if (!valid) throw new BadRequestException('パスワードが違います');

    // TODO: レスポンスからパスワードを除外する

    const tokens = await this.apiAuthService.getAccessToken(user);
    // cookieにtokenセット
    response.cookie('access_token', tokens.access_token, { httpOnly: true, secure: true });
    response.cookie('refresh_token', tokens.refresh_token, { httpOnly: true, secure: true });

    return true;
  }

  @Post(ReqUrlUtil.auth.logout)
  async logout(): Promise<boolean> {
    return true;
  }

  @Post(ReqUrlUtil.auth.signUp)
  async signUp(): Promise<boolean> {
    return true;
  }
}

import { BadRequestException, Body, Controller, Post, Res } from '@nestjs/common';
import { ApiAuthService } from './api-auth.service';
import { ReqUrlUtil } from '@nx-demo/shared-utils';
import { ILoginPayload, ITokenResponse } from '@nx-demo/shared-domain';
import { Response } from 'express';

@Controller()
export class ApiAuthController {

  constructor(
    private apiAuthService: ApiAuthService,
  ) { }

  @Post(ReqUrlUtil.auth.login)
  async login(@Body() { email, password }: ILoginPayload, @Res({ passthrough: true }) response: Response): Promise<ITokenResponse> {
    const user = await this.apiAuthService.getUserByEmail(email);
    if (user == null) throw new BadRequestException('ユーザが見つかりません');

    const valid = await this.apiAuthService.validateUser(user, password);
    if (!valid) throw new BadRequestException('パスワードが違います');

    // TODO: レスポンスからパスワードを除外する

    const token = await this.apiAuthService.getAccessToken(user);
    response.cookie('access_token', token.access_token, { httpOnly: true });
    return token;
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { IAccessTokenPayload, IUser } from '@nx-demo/shared-domain';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // cookieからアクセストークンを抽出
        (req: Request) => req.cookies['accessToken'],
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: IAccessTokenPayload) {
    return { id: payload.sub } as Pick<IUser, 'id'>;
  }
}

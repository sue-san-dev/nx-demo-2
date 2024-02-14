import { Injectable } from '@nestjs/common';
import { ApiPrismaService } from '@nx-demo/api-prisma';
import { IAccessTokenPayload } from '@nx-demo/shared-domain';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiAuthService {

  constructor(
    private apiPrismaService: ApiPrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  getUserByEmail(email: string) {
    return this.apiPrismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  validateUser(user: User, password: string) {
    return bcrypt.compare(user.password, password);
  }

  async getAccessToken(user: User) {
    const payload: IAccessTokenPayload = {
      email: user.email,
      sub: user.id,
    };

    const [access_token, refresh_token] = await Promise.all([
      // access_token取得
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN'),
      }),
      // refresh_token取得
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_IN'),
      }),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { ApiPrismaService } from '@nx-demo/api-prisma';
import { IAccessTokenPayload, IUser } from '@nx-demo/shared-domain';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaExcludeUtil } from '@nx-demo/shared-utils';

@Injectable()
export class ApiAuthService {

  constructor(
    private apiPrismaService: ApiPrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  getUserById(id: number) {
    return this.apiPrismaService.user.findUnique({
      where: {
        id,
      },
      select: PrismaExcludeUtil.userWithoutPassword,
    });
  }

  getUserByEmail(email: string) {
    return this.apiPrismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  validateUser(password: string, user: User) {
    return bcrypt.compare(password, user.password);
  }

  async getAccessToken(user: IUser) {
    const payload: IAccessTokenPayload = {
      email: user.email,
      sub: user.id,
    };

    const [accessToken, refreshToken] = await Promise.all([
      // accessToken取得
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN'),
      }),
      // refreshToken取得
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_IN'),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}

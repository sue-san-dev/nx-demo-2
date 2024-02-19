import { Module } from '@nestjs/common';
import { ApiAuthController } from './api-auth.controller';
import { ApiAuthService } from './api-auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt-strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@nx-demo/api-shared-guards';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('JWT_ACCESS_TOKEN_EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ApiAuthController],
  providers: [
    ApiAuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [ApiAuthService],
})
export class ApiAuthModule { }

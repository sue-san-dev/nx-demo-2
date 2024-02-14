import { Module } from '@nestjs/common';
import { ApiShellModule } from '@nx-demo/api-shell';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import Joi from 'joi';

@Module({
  imports: [
    ApiShellModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRES_IN: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRES_IN: Joi.string().required(),
      }),
    }),
    JwtModule.register({
      global: true,
    }),
    // JwtModule.registerAsync({
    //   useFactory: (configService: ConfigService) => {
    //     return {
    //       secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
    //       signOptions: {
    //         expiresIn: configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN'),
    //       },
    //     }
    //   },
    //   inject: [ConfigService],
    // }),
  ],
  providers: [
  ],
})
export class AppModule { }

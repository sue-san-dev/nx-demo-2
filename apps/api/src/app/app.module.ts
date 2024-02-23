import { Module } from '@nestjs/common';
import { ApiShellModule } from '@nx-demo/api-shell';
import { ConfigModule } from '@nestjs/config';
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
  ],
  providers: [
  ],
})
export class AppModule { }

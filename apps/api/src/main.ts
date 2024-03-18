import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.use(cookieParser.default());

  app.enableCors();

  // バージョン管理を有効にする
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1'],
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${ port }/${ globalPrefix }`
  );
}

bootstrap();

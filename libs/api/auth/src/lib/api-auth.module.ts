import { Module } from '@nestjs/common';
import { ApiAuthController } from './api-auth.controller';
import { ApiAuthService } from './api-auth.service';

@Module({
  controllers: [ApiAuthController],
  providers: [ApiAuthService],
  exports: [ApiAuthService],
})
export class ApiAuthModule {}

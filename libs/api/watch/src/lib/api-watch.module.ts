import { Module } from '@nestjs/common';
import { ApiWatchController } from './api-watch.controller';
import { ApiWatchService } from './api-watch.service';

@Module({
  controllers: [ApiWatchController],
  providers: [ApiWatchService],
  exports: [ApiWatchService],
})
export class ApiWatchModule {}

import { Module } from '@nestjs/common';
import { ApiBrowseController } from './api-browse.controller';
import { ApiBrowseService } from './api-browse.service';

@Module({
  controllers: [ApiBrowseController],
  providers: [ApiBrowseService],
  exports: [ApiBrowseService],
})
export class ApiBrowseModule {}

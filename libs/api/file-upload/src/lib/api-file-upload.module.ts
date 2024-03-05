import { Module } from '@nestjs/common';
import { ApiFileUploadController } from './api-file-upload.controller';
import { ApiFileUploadService } from './api-file-upload.service';

@Module({
  controllers: [ApiFileUploadController],
  providers: [ApiFileUploadService],
  exports: [ApiFileUploadService],
})
export class ApiFileUploadModule {}

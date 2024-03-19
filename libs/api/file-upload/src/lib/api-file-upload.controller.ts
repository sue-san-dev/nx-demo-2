import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiFileUploadService } from './api-file-upload.service';
import { Express } from 'express';
import 'multer';
import { ReqUrlUtil } from '@nx-demo/shared-utils';

@Controller()
export class ApiFileUploadController {

  constructor(
    private apiFileUploadService: ApiFileUploadService,
  ) { }

  @Post(ReqUrlUtil.file.upload)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      console.log('POST /file/upload start!');
      await this.apiFileUploadService.uploadFile(file);
      console.log('POST /file/upload finished!');
    } catch (error) {
      console.error(error);
    }
  }

}

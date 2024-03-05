import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiFileUploadService } from './api-file-upload.service';
import { Express } from 'express';
import 'multer';

@Controller()
export class ApiFileUploadController {

  constructor(
    private apiFileUploadService: ApiFileUploadService,
  ) { }

  @Post('/file/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      await this.apiFileUploadService.uploadFile(file.buffer, file.originalname);
    } catch (error) {
      console.error(error);
    }
  }

}

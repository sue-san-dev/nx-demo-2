import { Controller, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiFileUploadService } from './api-file-upload.service';
import { Express, Response } from 'express';
import 'multer';
import { ReqUrlUtil } from '@nx-demo/shared-utils';

@Controller()
export class ApiFileUploadController {

  constructor(
    private apiFileUploadService: ApiFileUploadService,
  ) { }

  @Post(ReqUrlUtil.file.upload)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Res() response: Response) {
    response.setHeader('Cache-Control', 'no-cache');
    response.setHeader('Content-Type', 'text/event-stream');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Connection', 'keep-alive');
    response.flushHeaders();

    try {
      console.log('POST /file/upload start!');
      let i = 0;
      const timer = setTimeout(() => {
        response.write(++i);
      }, 500);
      await this.apiFileUploadService.uploadFile(file);
      clearTimeout(timer);
      response.end()
      console.log('POST /file/upload end!');
    } catch (error) {
      console.error(error);
    }
  }

}

import { Controller, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiFileUploadService } from './api-file-upload.service';
import { Express, Response } from 'express';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { ReqUrlUtil } from '@nx-demo/shared-utils';
import 'multer';

@Controller()
export class ApiFileUploadController {

  constructor(
    private apiFileUploadService: ApiFileUploadService,
  ) { }

  @Post(ReqUrlUtil.file.upload)
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Res() response: Response) {
    // SSE用header設定
    response.setHeader('Cache-Control', 'no-cache');
    response.setHeader('Content-Type', 'text/event-stream');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Connection', 'keep-alive');
    response.flushHeaders();

    console.log('POST /file/upload start!');
    return this.apiFileUploadService.uploadFile(file).pipe(
      tap(percent => response.write(percent.toString())),
      catchError(err => throwError(() => err)),
      finalize(() => {
        response.end();
        console.log('POST /file/upload end!');
      }),
    );
  }

}

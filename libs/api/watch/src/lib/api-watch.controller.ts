import { Body, Controller, Get, ParseIntPipe, Patch, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiWatchService } from './api-watch.service';
import { ReqUrlUtil, UrlUtil } from '@nx-demo/shared-utils';
import { IComment, IVideoMetadata, IVideoMetadataDetail } from '@nx-demo/shared-domain';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { catchError, finalize, tap, throwError } from 'rxjs';
import 'multer';
import { Prisma, Video } from '@prisma/client';

@Controller()
export class ApiWatchController {

  constructor(private apiWatchService: ApiWatchService) { }

  @Get(ReqUrlUtil.video.root)
  async getVideoMetadata(
    @Query(UrlUtil.videoKey) videoKey: string,
  ): Promise<IVideoMetadataDetail> {
    const result = await this.apiWatchService.getVideoMetadata(videoKey);
    if (result == null) throw new Error();

    return result;
  }

  @Patch(ReqUrlUtil.video.root)
  async patchVideo(
    @Query(UrlUtil.videoKey) videoKey: string,
    @Body() payload: Prisma.VideoUpdateInput,
  ): Promise<Video> {
    const result = await this.apiWatchService.patchVideo(videoKey, payload);

    return result;
  }

  @Post(ReqUrlUtil.video.root)
  @UseInterceptors(FileInterceptor('file'))
  postVideo(
    @UploadedFile() file: Express.Multer.File, 
    @Res() response: Response,
  ) {
    // SSE用header設定
    response.setHeader('Cache-Control', 'no-cache');
    response.setHeader('Content-Type', 'text/event-stream');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Connection', 'keep-alive');
    response.flushHeaders();

    console.log('POST /video start!');
    return this.apiWatchService.postVideo(file).pipe(
      catchError(err => throwError(() => err)),
      tap(progress => {
        switch (progress.type) {
          case 'converting':
          case 'uploading':
            response.write(`${ progress.type }:${ progress.percent.toString() }`)
            break;
          case 'completed':
            response.write(`${ progress.type }:${ progress.videoUuid }`)
            break;
        }
      }),
      finalize(() => {
        response.end();
        console.log('POST /video complete!');
      }),
    );
  }

  @Get(ReqUrlUtil.video.comments)
  async getVideoComments(
    @Query(UrlUtil.videoKey) videoKey: string,
    @Query(UrlUtil.offset, ParseIntPipe) offset: number,
    @Query(UrlUtil.parentCommentId, new ParseIntPipe({ optional: true })) parentCommentId?: number,
  ): Promise<IComment[]> {
    const result = await this.apiWatchService.getVideoComments(videoKey, offset, parentCommentId);

    return result;
  }

  @Get(ReqUrlUtil.video.relatedVideos)
  async getRelatedVideos(
    @Query(UrlUtil.videoKey) videoKey: string,
    @Query(UrlUtil.offset, ParseIntPipe) offset: number,
  ): Promise<IVideoMetadata[]> {
    const result = await this.apiWatchService.getRelatedVideos(videoKey, offset);

    return result;
  }
}

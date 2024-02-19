import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ApiWatchService } from './api-watch.service';
import { ReqUrlUtil, UrlUtil } from '@nx-demo/shared-utils';
import { IComment, IVideoMetadata, IVideoMetadataDetail } from '@nx-demo/shared-domain';

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

import { Controller, Get, Query } from '@nestjs/common';
import { ApiWatchService } from './api-watch.service';
import { UrlUtil } from '@nx-demo/shared-utils';
import { VideoMetadataDetail } from '@nx-demo/shared-domain';

@Controller({ path: UrlUtil.Watch })
export class ApiWatchController {

  constructor(private apiWatchService: ApiWatchService) { }

  @Get()
  async getVideoMetadata(@Query(UrlUtil.VideoKey) videoKey: string): Promise<VideoMetadataDetail> {
    const result = await this.apiWatchService.getVideoMetadata(videoKey);
    if (result == null) throw new Error();

    return result;
  }
}

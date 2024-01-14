import { Controller, Get, Query } from '@nestjs/common';
import { ApiWatchService } from './api-watch.service';
import { UrlUtil } from '@nx-demo/shared-utils';
import { VideoInfo } from '@nx-demo/shared-domain';

@Controller({ path: UrlUtil.Watch })
export class ApiWatchController {

  constructor(private apiWatchService: ApiWatchService) { }

  @Get()
  async getVideo(@Query(UrlUtil.VideoKey) videoKey: string): Promise<VideoInfo> {
    const result = await this.apiWatchService.getVideo(videoKey);
    if (result == null) throw new Error();

    return result;
  }
}

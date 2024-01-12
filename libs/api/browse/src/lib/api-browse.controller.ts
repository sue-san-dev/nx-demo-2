import { Controller, Get } from '@nestjs/common';
import { ApiBrowseService } from './api-browse.service';
import { UrlUtil } from '@nx-demo/shared-utils';
import { VideoInfo } from '@nx-demo/shared-domain';

@Controller({ path: UrlUtil.Browse })
export class ApiBrowseController {

  constructor(
    private apiBrowseService: ApiBrowseService,
  ) { }

  @Get()
  async browse(): Promise<VideoInfo[]> {
    const result = await this.apiBrowseService.browse();
    return result;
  }
}

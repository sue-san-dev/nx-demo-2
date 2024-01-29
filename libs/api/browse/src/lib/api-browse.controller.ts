import { Controller, Get } from '@nestjs/common';
import { ApiBrowseService } from './api-browse.service';
import { VideoMetadata } from '@nx-demo/shared-domain';
import { ReqUrlUtil } from '@nx-demo/shared-utils';

@Controller()
export class ApiBrowseController {

  constructor(
    private apiBrowseService: ApiBrowseService,
  ) { }

  @Get(ReqUrlUtil.browse.root)
  async browse(): Promise<VideoMetadata[]> {
    const result = await this.apiBrowseService.browse();
    return result;
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { ApiSearchService } from './api-search.service';
import { ReqUrlUtil, UrlUtil } from '@nx-demo/shared-utils';
import { VideoMetadata } from '@nx-demo/shared-domain';

@Controller()
export class ApiSearchController {

  constructor(
    private apiSearchService: ApiSearchService,
  ) { }

  @Get(ReqUrlUtil.search.root)
  async browse(@Query(UrlUtil.SearchQuery) searchQuery: string): Promise<VideoMetadata[]> {
    const result = await this.apiSearchService.search(searchQuery);
    return result;
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { ApiSearchService } from './api-search.service';
import { UrlUtil } from '@nx-demo/shared-utils';
import { VideoInfo } from '@nx-demo/shared-domain';

@Controller({ path: UrlUtil.Search })
export class ApiSearchController {

  constructor(
    private apiSearchService: ApiSearchService,
  ) { }

  @Get()
  async browse(@Query(UrlUtil.SearchQuery) searchQuery: string): Promise<VideoInfo[]> {
    const result = await this.apiSearchService.search(searchQuery);
    return result;
  }
}

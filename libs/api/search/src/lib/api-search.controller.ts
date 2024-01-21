import { Controller, Get, Query } from '@nestjs/common';
import { ApiSearchService } from './api-search.service';
import { UrlUtil } from '@nx-demo/shared-utils';
import { VideoMetadata } from '@nx-demo/shared-domain';

@Controller({ path: UrlUtil.Search })
export class ApiSearchController {

  constructor(
    private apiSearchService: ApiSearchService,
  ) { }

  @Get()
  async browse(@Query(UrlUtil.SearchQuery) searchQuery: string): Promise<VideoMetadata[]> {
    const result = await this.apiSearchService.search(searchQuery);
    return result;
  }
}

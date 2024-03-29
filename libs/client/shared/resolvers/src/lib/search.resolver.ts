import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SearchService } from '@nx-demo/client-shared-services';
import { IVideoMetadata } from '@nx-demo/shared-domain';
import { UrlUtil } from '@nx-demo/shared-utils';
import { forkJoin } from 'rxjs';

export interface ISearchData {
  videos: IVideoMetadata[];
}

export const searchResolver: ResolveFn<ISearchData> = (route) => {
  const searchService = inject(SearchService);
  const searchQuery = route.queryParamMap.get(UrlUtil.searchQuery);
  if (searchQuery == null) throw new Error();

  return forkJoin({
    videos: searchService.search(searchQuery),
  });
}

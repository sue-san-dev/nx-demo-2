import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SearchService } from '@nx-demo/client-shared-services';
import { VideoMetadata } from '@nx-demo/shared-domain';
import { UrlUtil } from '@nx-demo/shared-utils';
import { map } from 'rxjs';

export interface ISearchData {
  videos: VideoMetadata[];
}

export const searchResolver: ResolveFn<ISearchData> = (route) => {
  const searchService = inject(SearchService);
  const searchQuery = route.queryParamMap.get(UrlUtil.SearchQuery);
  if (searchQuery == null) throw new Error();

  return searchService.search(searchQuery).pipe(
    map(videos => {
      return {
        videos,
      }
    })
  );
}

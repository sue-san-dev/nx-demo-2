import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SearchService } from '@nx-demo/client-shared-services';
import { UrlUtil } from '@nx-demo/shared-utils';
import { Video } from '@prisma/client';
import { map } from 'rxjs';

export interface ISearchData {
  videos: Video[];
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

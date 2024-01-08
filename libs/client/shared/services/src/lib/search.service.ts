import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ReqUrlUtil, UrlUtil } from '@nx-demo/shared-utils';
import { Observable } from 'rxjs';
import { Video } from '@prisma/client';

@Injectable({ providedIn: 'root' })
export class SearchService {
  readonly #http = inject(HttpClient)

  search(searchQuery: string): Observable<Video[]> {
    return this.#http.get<Video[]>(ReqUrlUtil.getSearchUrl(), {
      params: {
        [UrlUtil.SearchQuery]: searchQuery,
      }
    })
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ReqUrlUtil, UrlUtil } from '@nx-demo/shared-utils';
import { Observable } from 'rxjs';
import { VideoMetadata } from '@nx-demo/shared-domain';

@Injectable({ providedIn: 'root' })
export class SearchService {
  readonly #http = inject(HttpClient)

  search(searchQuery: string): Observable<VideoMetadata[]> {
    return this.#http.get<VideoMetadata[]>(ReqUrlUtil.search.root, {
      params: {
        [UrlUtil.SearchQuery]: searchQuery,
      }
    })
  }
}
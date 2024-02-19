import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ReqUrlUtil, UrlUtil } from '@nx-demo/shared-utils';
import { Observable } from 'rxjs';
import { IVideoMetadata } from '@nx-demo/shared-domain';

@Injectable({ providedIn: 'root' })
export class SearchService {

  readonly #http = inject(HttpClient);

  search(searchQuery: string): Observable<IVideoMetadata[]> {
    return this.#http.get<IVideoMetadata[]>(ReqUrlUtil.search.root, {
      params: {
        [UrlUtil.searchQuery]: searchQuery,
      }
    });
  }
}
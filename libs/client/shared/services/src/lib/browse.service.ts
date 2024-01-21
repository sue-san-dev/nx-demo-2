import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { VideoMetadata } from '@nx-demo/shared-domain';
import { ReqUrlUtil } from '@nx-demo/shared-utils';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BrowseService {
  readonly #http = inject(HttpClient)

  browse(): Observable<VideoMetadata[]> {
    return this.#http.get<VideoMetadata[]>(ReqUrlUtil.getBrowseUrl())
  }
}
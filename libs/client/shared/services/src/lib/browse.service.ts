import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { VideoInfo } from '@nx-demo/shared-domain';
import { ReqUrlUtil } from '@nx-demo/shared-utils';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BrowseService {
  readonly #http = inject(HttpClient)

  browse(): Observable<VideoInfo[]> {
    return this.#http.get<VideoInfo[]>(ReqUrlUtil.getBrowseUrl())
  }
}
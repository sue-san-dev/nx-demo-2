import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ReqUrlUtil, UrlUtil } from '@nx-demo/shared-utils';
import { Observable } from 'rxjs';
import { VideoInfo } from '@nx-demo/shared-domain';

@Injectable({ providedIn: 'root' })
export class VideoService {
  readonly #http = inject(HttpClient)

  getVideo(videoKey: string): Observable<VideoInfo> {
    return this.#http.get<VideoInfo>(ReqUrlUtil.getWatchUrl(), {
      params: {
        [UrlUtil.VideoKey]: videoKey,
      }
    })
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ReqUrlUtil, UrlUtil } from '@nx-demo/shared-utils';
import { Observable } from 'rxjs';
import { VideoMetadataDetail } from '@nx-demo/shared-domain';

@Injectable({ providedIn: 'root' })
export class VideoService {
  readonly #http = inject(HttpClient)

  getVideo(videoKey: string): Observable<VideoMetadataDetail> {
    return this.#http.get<VideoMetadataDetail>(ReqUrlUtil.watch.root, {
      params: {
        [UrlUtil.VideoKey]: videoKey,
      }
    })
  }
}
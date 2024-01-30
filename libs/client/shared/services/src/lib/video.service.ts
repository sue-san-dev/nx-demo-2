import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ReqUrlUtil, UrlUtil } from '@nx-demo/shared-utils';
import { Observable } from 'rxjs';
import { VideoMetadata, VideoMetadataDetail } from '@nx-demo/shared-domain';

@Injectable({ providedIn: 'root' })
export class VideoService {

  readonly #http = inject(HttpClient)

  getVideo(videoKey: string): Observable<VideoMetadataDetail> {
    return this.#http.get<VideoMetadataDetail>(ReqUrlUtil.video.root, {
      params: {
        [UrlUtil.VideoKey]: videoKey,
      }
    })
  }

  getRelatedVideos(videoKey: string, offset: number): Observable<VideoMetadata[]> {
    return this.#http.get<VideoMetadata[]>(ReqUrlUtil.video.relatedVideos, {
      params: {
        [UrlUtil.VideoKey]: videoKey,
        [UrlUtil.Offset]: offset,
      }
    });
  }
}
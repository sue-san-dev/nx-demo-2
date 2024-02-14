import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ReqUrlUtil, UrlUtil } from '@nx-demo/shared-utils';
import { Observable } from 'rxjs';
import { IVideoMetadata, IVideoMetadataDetail } from '@nx-demo/shared-domain';

@Injectable({ providedIn: 'root' })
export class VideoService {

  readonly #http = inject(HttpClient);

  getVideo(videoKey: string): Observable<IVideoMetadataDetail> {
    return this.#http.get<IVideoMetadataDetail>(ReqUrlUtil.video.root, {
      params: {
        [UrlUtil.videoKey]: videoKey,
      }
    });
  }

  getRelatedVideos(videoKey: string, offset: number): Observable<IVideoMetadata[]> {
    return this.#http.get<IVideoMetadata[]>(ReqUrlUtil.video.relatedVideos, {
      params: {
        [UrlUtil.videoKey]: videoKey,
        [UrlUtil.offset]: offset,
      }
    });
  }
}
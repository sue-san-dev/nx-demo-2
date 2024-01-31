import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ReqUrlUtil, UrlUtil } from '@nx-demo/shared-utils';
import { Observable } from 'rxjs';
import { IComment } from '@nx-demo/shared-domain';

@Injectable({ providedIn: 'root' })
export class CommentService {

  readonly #http = inject(HttpClient);

  getComments(videoKey: string, offset: number): Observable<IComment[]> {
    return this.#http.get<IComment[]>(ReqUrlUtil.video.comments, {
      params: {
        [UrlUtil.VideoKey]: videoKey,
        [UrlUtil.Offset]: offset,
      }
    });
  }
}
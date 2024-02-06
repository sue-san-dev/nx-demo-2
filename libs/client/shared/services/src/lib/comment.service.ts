import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ReqUrlUtil, UrlUtil } from '@nx-demo/shared-utils';
import { Observable } from 'rxjs';
import { IComment } from '@nx-demo/shared-domain';

@Injectable({ providedIn: 'root' })
export class CommentService {

  readonly #http = inject(HttpClient);

  getComments(videoKey: string, offset: number, parentCommentId?: number): Observable<IComment[]> {
    const params = {
      [UrlUtil.VideoKey]: videoKey,
      [UrlUtil.Offset]: offset,
    };
    if (parentCommentId) {
      Object.assign(params, {
        [UrlUtil.ParentCommentId]: parentCommentId,
      })
    }

    return this.#http.get<IComment[]>(ReqUrlUtil.video.comments, {
      params,
    });
  }
}
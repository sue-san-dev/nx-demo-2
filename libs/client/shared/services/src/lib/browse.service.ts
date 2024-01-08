import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ReqUrlUtil } from '@nx-demo/shared-utils';
import { Observable } from 'rxjs';
import { Video } from '@prisma/client';

@Injectable({ providedIn: 'root' })
export class BrowseService {
  readonly #http = inject(HttpClient)

  browse(): Observable<Video[]> {
    return this.#http.get<Video[]>(ReqUrlUtil.getBrowseUrl())
  }
}
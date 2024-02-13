import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IVideoMetadata } from '@nx-demo/shared-domain';
import { ReqUrlUtil } from '@nx-demo/shared-utils';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  readonly #http = inject(HttpClient);

  login(): Observable<> {
    // return this.#http.get<IVideoMetadata[]>(ReqUrlUtil.browse.root);
  }
}
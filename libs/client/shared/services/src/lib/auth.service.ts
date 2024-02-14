import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ILoginPayload, ITokenResponse } from '@nx-demo/shared-domain';
import { ReqUrlUtil } from '@nx-demo/shared-utils';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  readonly #http = inject(HttpClient);

  login(data: ILoginPayload): Observable<ITokenResponse> {
    return this.#http.post<ITokenResponse>(ReqUrlUtil.auth.login, data);
  }
}
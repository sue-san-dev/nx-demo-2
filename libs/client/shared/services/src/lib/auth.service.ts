import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ILoginPayload, IUser } from '@nx-demo/shared-domain';
import { ReqUrlUtil } from '@nx-demo/shared-utils';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  readonly #http = inject(HttpClient);

  login(data: ILoginPayload): Observable<IUser> {
    return this.#http.post<IUser>(ReqUrlUtil.auth.login, data);
  }
}
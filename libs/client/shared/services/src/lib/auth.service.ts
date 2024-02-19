import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ILoginPayload, IUser } from '@nx-demo/shared-domain';
import { ReqUrlUtil } from '@nx-demo/shared-utils';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  readonly #http = inject(HttpClient);

  auth(): Observable<IUser | null> {
    return this.#http.post<IUser | null>(ReqUrlUtil.auth.root, null);
  }

  login(data: ILoginPayload): Observable<IUser> {
    return this.#http.post<IUser>(ReqUrlUtil.auth.login, data);
  }

  logout(): Observable<null> {
    return this.#http.post<void>(ReqUrlUtil.auth.logout, null).pipe(map(() => null));
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ILoginPayload, IUser } from '@nx-demo/shared-domain';
import { ReqUrlUtil } from '@nx-demo/shared-utils';
import { Observable, finalize, map, shareReplay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  readonly #http = inject(HttpClient);

  /** auth()専用 */
  #auth$: Observable<IUser | null> | null = null;

  auth(): Observable<IUser | null> {
    // 認証リクエストが一度に複数回飛ぶことを防ぐ処理
    if (this.#auth$ == null) {
      this.#auth$ = this.#http.post<IUser | null>(ReqUrlUtil.auth.root, null).pipe(
        shareReplay(1),
        finalize(() => this.#auth$ = null),
      );
    }
    return this.#auth$;
  }

  login(data: ILoginPayload): Observable<IUser> {
    return this.#http.post<IUser>(ReqUrlUtil.auth.login, data);
  }

  logout(): Observable<null> {
    return this.#http.post<void>(ReqUrlUtil.auth.logout, null).pipe(map(() => null));
  }
}
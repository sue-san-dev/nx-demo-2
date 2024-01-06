import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ReqUrlUtil } from '@nx-demo/utils';
import { Observable } from 'rxjs';
import { User } from '@prisma/client';

@Injectable({ providedIn: 'root' })
export class UserService {
  readonly #http = inject(HttpClient)

  getUser(userId: number): Observable<User> {
    userId = 1
    return this.#http.get<User>(ReqUrlUtil.getUserUrl(userId))
  }
}
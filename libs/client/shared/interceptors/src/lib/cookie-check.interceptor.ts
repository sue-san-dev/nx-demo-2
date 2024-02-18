import { inject } from '@angular/core';
import { AuthStore } from '@nx-demo/client-shared-stores';
import { HttpInterceptorFn } from '@angular/common/http';
import { switchMap } from 'rxjs';
import { ReqUrlUtil } from '@nx-demo/shared-utils';

export const cookieCheckInterceptor: HttpInterceptorFn = (request, next) => {
  const authStore = inject(AuthStore);

  if (request.url === ReqUrlUtil.auth.root) {
    return next(request);
  } else {
    return authStore.auth().pipe(switchMap(() => next(request)));
  }
}

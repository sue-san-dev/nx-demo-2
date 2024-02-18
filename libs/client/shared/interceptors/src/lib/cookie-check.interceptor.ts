import { inject } from '@angular/core';
import { AuthStore } from '@nx-demo/client-shared-stores';
import { HttpInterceptorFn } from '@angular/common/http';
import { switchMap } from 'rxjs';

export const cookieCheckInterceptor: HttpInterceptorFn = (request, next) => {
  const authStore = inject(AuthStore);

  if (request.headers.has('X-Skip-Interceptor')) {
    return next(request);
  } else {
    return authStore.auth().pipe(switchMap(() => next(request)));
  }
}

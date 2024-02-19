import { inject } from '@angular/core';
import { AuthStore } from '@nx-demo/client-shared-stores';
import { HttpInterceptorFn } from '@angular/common/http';
import { switchMap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ReqUrlUtil } from '@nx-demo/shared-utils';

export const authStateCheckInterceptor: HttpInterceptorFn = (request, next) => {
  const authStore = inject(AuthStore);
  const cookieService = inject(CookieService);

  const isAuthenticated = cookieService.check('isAuthenticated');

  if (!isAuthenticated && authStore.loginUser()) {
    authStore.clearLoginUser();
  }

  if (
    isAuthenticated
    && authStore.loginUser() == null
    && request.url != ReqUrlUtil.auth.root
    && request.url != ReqUrlUtil.auth.login
  ) {
    return authStore.auth().pipe(switchMap(() => next(request)));
  }
  return next(request);
}

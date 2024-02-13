import { inject } from '@angular/core';
import { signalStore, withMethods, withState } from '@ngrx/signals';
import { AuthService } from '@nx-demo/client-shared-services';

export const AuthStore = signalStore(
  withState({
    isLoggedIn: false,
  }),
  withMethods(state => {
    const authService = inject(AuthService);

    return {
      /** ログイン */
      login(email: string, password: string) {
        return authService.login(email, password);
      },
    }
  }),
);
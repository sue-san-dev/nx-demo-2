import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { AuthService } from '@nx-demo/client-shared-services';
import { ILoginPayload, IUser } from '@nx-demo/shared-domain';
import { CookieService } from 'ngx-cookie-service';
import { of, tap } from 'rxjs';

type State = {
  loginUser: IUser | null,
};
const initState: State = {
  loginUser: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },

  withState(initState),

  withMethods(state => {
    const cookieService = inject(CookieService);
    const authService = inject(AuthService);

    /** state更新 */
    const updateState = (loginUser: IUser | null) => {
      patchState(state, { loginUser });
    };

    return {
      /** 認証 */
      auth: () => {
        const isAuthenticated = cookieService.get('isAuthenticated') === 'true';

        if (isAuthenticated) {
          if (state.loginUser() == null) return authService.auth().pipe(tap(updateState));
        } else {
          if (state.loginUser()) updateState(null);
        }
        return of(state.loginUser());
      },
      /** ログイン */
      login: (data: ILoginPayload) => authService.login(data).pipe(tap(updateState)),
      /** ログアウト */
      logout: () => authService.logout().pipe(tap(() => updateState(null))),
    }
  }),
);
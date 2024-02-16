import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { AuthService } from '@nx-demo/client-shared-services';
import { ILoginPayload, IUser } from '@nx-demo/shared-domain';
import { tap } from 'rxjs';

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
    const authService = inject(AuthService);

    return {
      /** ログイン */
      login: (data: ILoginPayload) => {
        return authService.login(data).pipe(
          tap(loginUser => patchState(state, { loginUser })),
        );
      },
      /** ログアウト */
      logout: () => {
        return authService.logout().pipe(
          tap(() => patchState(state, { loginUser: null })),
        );
      },
    }
  }),
);
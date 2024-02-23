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

    /** state更新 */
    const updateState = (loginUser: IUser | null) => patchState(state, { loginUser });

    return {
      /** 認証 */
      auth: () => authService.auth().pipe(tap(updateState)),
      /** ログイン */
      login: (data: ILoginPayload) => authService.login(data).pipe(tap(updateState)),
      /** ログアウト */
      logout: () => authService.logout().pipe(tap(updateState)),
      /** loginUser情報をクリア */
      clearLoginUser: () => updateState(null),
    };
  }),
);
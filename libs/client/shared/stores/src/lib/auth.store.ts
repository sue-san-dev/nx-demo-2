import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { AuthService } from '@nx-demo/client-shared-services';
import { ILoginPayload } from '@nx-demo/shared-domain';
import { catchError, firstValueFrom } from 'rxjs';

type State = {
  isLoggedIn: boolean,
};

const initState: State = {
  isLoggedIn: false,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },

  withState(initState),

  withMethods(state => {
    const { isLoggedIn } = state;
    const authService = inject(AuthService);

    return {
      /** ログイン */
      login: (data: ILoginPayload) => {
        authService.login(data).pipe(
          // catchError(),
        ).subscribe(res => {
          res.accessToken
          patchState(state, { isLoggedIn: true });
        });
      },
    }
  }),

  withComputed(state => {
    const { isLoggedIn } = state;

    return {
      // selected: computed(() => flights().filter((f) => basket()[f.id])),
      // criteria: computed(() => ({ from: from(), to: to() })),
    }
  }),

  // withHooks(() => {

  // }),
);
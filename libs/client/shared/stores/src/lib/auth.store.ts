import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { AuthService } from '@nx-demo/client-shared-services';
import { ILoginPayload, IUser } from '@nx-demo/shared-domain';
import { catchError, firstValueFrom } from 'rxjs';

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
      login: async (data: ILoginPayload) => {
        const loginUser = await firstValueFrom(
          authService.login(data).pipe(
            // catchError(),
          )
        );
        patchState(state, { loginUser });
      },
    }
  }),

  withComputed(state => {
    return {
      // selected: computed(() => flights().filter((f) => basket()[f.id])),
      // criteria: computed(() => ({ from: from(), to: to() })),
    }
  }),

  // withHooks(() => {

  // }),
);
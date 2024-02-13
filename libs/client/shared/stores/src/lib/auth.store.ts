import { computed, inject } from '@angular/core';
import { signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { AuthService } from '@nx-demo/client-shared-services';

export const AuthStore = signalStore(
  { providedIn: 'root' },

  withState({
    isLoggedIn: false,
  }),

  withMethods(state => {
    const { isLoggedIn } = state;
    const authService = inject(AuthService);

    return {
      /** ログイン */
      login: (email: string, password: string) => {
        isLoggedIn()
        return authService.login(email, password);
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

  withHooks(() => {
    
  }),
);
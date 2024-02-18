import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AuthStore } from '@nx-demo/client-shared-stores';

export const rootResolver: ResolveFn<unknown> = () => {
  const authStore = inject(AuthStore);

  return authStore.auth();
}

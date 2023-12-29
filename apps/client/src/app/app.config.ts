import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { clientShellRoutes, routerFeatures } from '@nx-demo/client-shell';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(clientShellRoutes, ...routerFeatures),
  ],
};

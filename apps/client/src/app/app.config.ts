import { ApplicationConfig, inject } from '@angular/core';
import { IsActiveMatchOptions, Router, provideRouter, withViewTransitions } from '@angular/router';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes, withViewTransitions({
    onViewTransitionCreated: ({ transition }) => {
      const router = inject(Router)
      const targetUrl = router.getCurrentNavigation()!.finalUrl!

      // fragmentとqueryParamsの変更は無視する（transitionを行わない）
      const config: IsActiveMatchOptions = {
        paths: 'exact',
        matrixParams: 'exact',
        fragment: 'ignored',
        queryParams: 'ignored',
      }
      if (router.isActive(targetUrl, config)) {
        transition.skipTransition()
      }
    },
  }))],
};

import { ApplicationConfig, inject } from '@angular/core';
import { IsActiveMatchOptions, Router, provideRouter, withViewTransitions } from '@angular/router';
import { clientShellRoutes } from '@nx-demo/client-shell';
import { provideSvgIcons } from '@ngneat/svg-icon';
import { homeIcon } from '../assets/svg/home.icon';
import { shortIcon } from '../assets/svg/short.icon';
import { subscriptionsIcon } from '../assets/svg/subscriptions.icon';

export const appConfig: ApplicationConfig = {
  providers: [
    // SVGアイコン
    provideSvgIcons([
      homeIcon,
      shortIcon,
      subscriptionsIcon,
    ]),
    // router設定
    provideRouter(clientShellRoutes,
      // URL遷移時にアニメーション付与
      withViewTransitions({
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
      }),
    ),
  ],
};

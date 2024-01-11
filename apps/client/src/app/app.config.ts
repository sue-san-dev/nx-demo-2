import { ApplicationConfig, inject } from '@angular/core';
import { IsActiveMatchOptions, Router, provideRouter, withViewTransitions } from '@angular/router';
import { provideSvgIcons } from '@ngneat/svg-icon';
import { homeIcon } from '../assets/svg/home.icon';
import { shortIcon } from '../assets/svg/short.icon';
import { subscriptionsIcon } from '../assets/svg/subscriptions.icon';
import { provideHttpClient } from '@angular/common/http';
import { menuIcon } from '../assets/svg/menu.icon';
import { clientShellRoutes } from '@nx-demo/client-shell';

export const appConfig: ApplicationConfig = {
  providers: [
    // SVGアイコン
    provideSvgIcons([
      homeIcon,
      menuIcon,
      shortIcon,
      subscriptionsIcon,
    ]),
    // HttpClient
    provideHttpClient(),
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

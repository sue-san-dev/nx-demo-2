import { ApplicationConfig, inject } from '@angular/core';
import { IsActiveMatchOptions, Router, provideRouter, withComponentInputBinding, withViewTransitions, withInMemoryScrolling } from '@angular/router';
import { provideSvgIcons } from '@ngneat/svg-icon';
import { homeIcon } from '../assets/svg/home.icon';
import { shortIcon } from '../assets/svg/short.icon';
import { subscriptionsIcon } from '../assets/svg/subscriptions.icon';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { menuIcon } from '../assets/svg/menu.icon';
import { clientShellRoutes } from '@nx-demo/client-shell';
import { moreVertIcon } from '../assets/svg/more-vert.icon';
import { voiceIcon } from '../assets/svg/voice.icon';
import { accountCircleIcon } from '../assets/svg/account-circle.icon';
import { moreHorizIcon } from '../assets/svg/more-horiz.icon';
import { thumbUpIcon } from '../assets/svg/thumb-up.icon';
import { thumbDownIcon } from '../assets/svg/thumb-down.icon';
import { searchIcon } from '../assets/svg/search.icon';
import { playlistAddIcon } from '../assets/svg/playlist-add.icon';
import { environment } from '@nx-demo/shared-environments';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    // SVGアイコン
    provideSvgIcons([
      homeIcon,
      menuIcon,
      shortIcon,
      subscriptionsIcon,
      moreVertIcon,
      moreHorizIcon,
      voiceIcon,
      accountCircleIcon,
      thumbUpIcon,
      thumbDownIcon,
      searchIcon,
      playlistAddIcon,
    ]),
    // アニメーション
    provideAnimationsAsync(),
    // HttpClient
    provideHttpClient(
      // Fetch APIを使用
      withFetch(),
      // インターセプター設定
      withInterceptors([
        // req加工
        (req, next) => {
          req = req.clone({
            url: environment.apiUrl + req.url,
          });
          return next(req);
        }
      ]),
    ),
    // router設定
    provideRouter(
      clientShellRoutes,
      // スクロール挙動設定
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      }),
      // routeに載せたデータやURLパラメータをinputで受け取れるようにする
      withComponentInputBinding(),
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
          if (router.isActive(targetUrl, config) || router.lastSuccessfulNavigation === null) {
            transition.skipTransition()
          }
        },
      }),
    ),
  ],
};

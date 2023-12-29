import { inject } from '@angular/core';
import { IsActiveMatchOptions, Router, RouterFeatures, withViewTransitions } from '@angular/router';

export const routerFeatures: RouterFeatures[] = [
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
]
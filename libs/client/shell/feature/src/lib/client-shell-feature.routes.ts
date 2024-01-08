import { Route } from '@angular/router';
import { ClientShellUiLayoutComponent } from '@nx-demo/client-shell-ui-layout';
import { browseResolver, searchResolver } from '@nx-demo/client-shared-resolvers';
import { UrlUtil } from '@nx-demo/shared-utils';

export const clientShellFeatureRoutes: Route[] = [
  {
    path: '',
    component: ClientShellUiLayoutComponent,
    title: 'YouTube Clone',
    children: [
      {
        path: '',
        loadComponent: () => import('@nx-demo/client-browse-feature').then(x => x.ClientBrowseFeatureComponent),
        resolve: { data: browseResolver },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
      },
      {
        path: UrlUtil.Result,
        loadComponent: () => import('@nx-demo/client-search-feature').then(x => x.ClientSearchFeatureComponent),
        resolve: { data: searchResolver },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
      },
    ]
  },
];

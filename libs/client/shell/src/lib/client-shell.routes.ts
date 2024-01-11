import { Route } from '@angular/router';
import { browseResolver, searchResolver } from '@nx-demo/client-shared-resolvers';
import { UrlUtil } from '@nx-demo/shared-utils';
import { ClientLayoutFeatureComponent } from '@nx-demo/client-layout-feature';

export const clientShellRoutes: Route[] = [
  {
    path: '',
    component: ClientLayoutFeatureComponent,
    title: 'YouTube Clone',
    children: [
      {
        path: '',
        loadComponent: () => import('@nx-demo/client-browse-feature').then(x => x.ClientBrowseFeatureComponent),
        resolve: { resolvedData: browseResolver },
        runGuardsAndResolvers: 'always',
      },
      {
        path: UrlUtil.Result,
        loadComponent: () => import('@nx-demo/client-search-feature').then(x => x.ClientSearchFeatureComponent),
        resolve: { resolvedData: searchResolver },
        runGuardsAndResolvers: 'always',
      },
    ]
  },
];
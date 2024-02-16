import { Route } from '@angular/router';
import { browseResolver, searchResolver, watchResolver } from '@nx-demo/client-shared-resolvers';
import { UrlUtil } from '@nx-demo/shared-utils';
import { ClientLayoutFeatureComponent } from '@nx-demo/client-layout-feature';

export const clientShellRoutes: Route[] = [
  {
    path: UrlUtil.login,
    loadComponent: () => import('@nx-demo/client-login-feature').then(x => x.ClientLoginFeatureComponent),
  },
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
        path: UrlUtil.result,
        loadComponent: () => import('@nx-demo/client-search-feature').then(x => x.ClientSearchFeatureComponent),
        resolve: { resolvedData: searchResolver },
        runGuardsAndResolvers: 'always',
      },
      {
        path: UrlUtil.watch,
        loadComponent: () => import('@nx-demo/client-watch-feature').then(x => x.ClientWatchFeatureComponent),
        resolve: { resolvedData: watchResolver },
        runGuardsAndResolvers: 'always',
      },
      {
        path: `:${ UrlUtil.channelHandle }`,
        loadChildren: () => import('./feature-routes/client-channel.routes').then(x => x.clientChannelRoutes),
      },
    ]
  },
];

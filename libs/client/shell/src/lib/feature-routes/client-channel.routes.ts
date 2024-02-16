import { Route } from '@angular/router';
import { browseResolver } from '@nx-demo/client-shared-resolvers';
import { ClientChannelFeatureComponent } from '@nx-demo/client-channel-feature';

export const clientChannelRoutes: Route[] = [
  {
    path: '',
    component: ClientChannelFeatureComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('@nx-demo/client-channel-ui-tab-home').then(x => x.ClientChannelUiTabHomeComponent),
        resolve: { resolvedData: browseResolver },
        runGuardsAndResolvers: 'always',
      },
      // {
      //   path: UrlUtil.Result,
      //   loadComponent: () => import('@nx-demo/client-search-feature').then(x => x.ClientSearchFeatureComponent),
      //   resolve: { resolvedData: searchResolver },
      //   runGuardsAndResolvers: 'always',
      // },
    ]
  },
];

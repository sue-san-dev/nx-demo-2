import { Route } from '@angular/router';
import { ClientShellUiLayoutComponent } from '@nx-demo/client-shell-ui-layout';
import { browseResolver } from '@nx-demo/client-shared-resolvers';

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
      },
    ]
  },
];

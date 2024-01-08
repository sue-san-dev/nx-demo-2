import { Route } from '@angular/router';
import { LayoutComponent } from '@nx-demo/client-shell-ui-layout';
import { browseResolver } from '@nx-demo/client-shared-resolvers';

export const clientShellRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
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

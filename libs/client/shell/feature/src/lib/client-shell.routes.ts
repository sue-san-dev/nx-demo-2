import { Route } from '@angular/router';
import { LayoutComponent } from '@nx-demo/layout';
import { homeResolver } from '@nx-demo/resolvers';

export const clientShellRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    title: 'YouTube Clone',
    children: [
      {
        path: '',
        loadComponent: () => import('@nx-demo/home').then(x => x.HomeComponent),
        resolve: { data: homeResolver },
      },
    ]
  },
];

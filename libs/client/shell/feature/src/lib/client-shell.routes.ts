import { Route } from '@angular/router';
import { homeResolver } from '@nx-demo/home';
import { LayoutComponent } from '@nx-demo/layout';

export const clientShellRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('@nx-demo/home').then(x => x.HomeComponent),
        resolve: { data: homeResolver }
      },
    ]
  },
];

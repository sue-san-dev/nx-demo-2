import { Route } from '@angular/router';
import { LayoutComponent } from '@nx-demo/ui-components';

export const appRoutes: Route[] = [
  // 登録

  // ログイン

  // ログイン後
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        canActivate: [/** TODO: AuthGuard */],
        component: LayoutComponent,
        children: [

        ]
      }
    ]
  },
];

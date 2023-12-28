import { Route } from '@angular/router';
import { clientShellRoutes } from 'libs/client/shell/feature/src/lib/client-shell.routes';

export const appRoutes: Route[] = [
  {
    path: '',
    children: clientShellRoutes,
  },
];

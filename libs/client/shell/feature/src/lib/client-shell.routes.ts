import { Route } from '@angular/router';
import { LayoutComponent } from '@nx-demo/layout';

export const clientShellRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // {
      //   path: RouterUtil.Configuration.Visualizer,
      //   loadChildren: async () =>
      //     (await import('@angular-spotify/web/visualizer/feature')).VisualizerModule
      // },
    ]
  },
];

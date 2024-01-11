import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SHARED_MODULES } from '@nx-demo/client-shared-constants';

@Component({
  selector: 'nx-demo-client-layout-ui-sidenav',
  standalone: true,
  imports: [
    SHARED_MODULES,
  ],
  templateUrl: './client-layout-ui-sidenav.component.html',
  styleUrl: './client-layout-ui-sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientLayoutUiSidenavComponent {

  readonly items: { title: string, path: string, svgIconKey: string }[] = [
    {
      title: 'ホーム',
      path: '/',
      svgIconKey: 'home',
    },
    {
      title: 'ショート',
      path: '/shorts',
      svgIconKey: 'short',
    },
    {
      title: '登録チャンネル',
      path: '/feed/subscriptions',
      svgIconKey: 'subscriptions',
    },
  ];
}

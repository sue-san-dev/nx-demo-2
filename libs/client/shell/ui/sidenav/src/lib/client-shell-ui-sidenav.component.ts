import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SvgIconComponent } from '@ngneat/svg-icon';

@Component({
  selector: 'nx-demo-client-shell-ui-sidenav',
  standalone: true,
  imports: [
    RouterModule,
    SvgIconComponent,
  ],
  templateUrl: './client-shell-ui-sidenav.component.html',
  styleUrl: './client-shell-ui-sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientShellUiSidenavComponent {
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
  ]
}

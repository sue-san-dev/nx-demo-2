import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SvgIconComponent } from '@ngneat/svg-icon';

@Component({
  selector: 'nx-demo-sidenav',
  standalone: true,
  imports: [
    RouterModule,
    SvgIconComponent,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
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

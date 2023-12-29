import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SvgIconComponent } from '@ngneat/svg-icon';

@Component({
  selector: 'nx-demo-sidenav',
  standalone: true,
  imports: [
    SvgIconComponent,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent { }

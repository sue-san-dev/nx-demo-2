import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../../header/src/lib/header.component';
import { SidenavComponent } from '../../../sidenav/src/lib/sidenav.component';

@Component({
  selector: 'nx-demo-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    SidenavComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent { }

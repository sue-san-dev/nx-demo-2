import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@nx-demo/client-shell-ui-header';
import { SidenavComponent } from '@nx-demo/client-shell-ui-sidenav';

@Component({
  selector: 'nx-demo-layout',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    SidenavComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent { }

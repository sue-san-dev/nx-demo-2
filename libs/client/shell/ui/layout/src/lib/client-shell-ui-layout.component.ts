import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientShellUiHeaderComponent } from '@nx-demo/client-shell-ui-header';
import { ClientShellUiSidenavComponent } from '@nx-demo/client-shell-ui-sidenav';

@Component({
  selector: 'nx-demo-client-shell-ui-layout',
  standalone: true,
  imports: [
    RouterModule,
    ClientShellUiHeaderComponent,
    ClientShellUiSidenavComponent,
  ],
  templateUrl: './client-shell-ui-layout.component.html',
  styleUrl: './client-shell-ui-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientShellUiLayoutComponent { }

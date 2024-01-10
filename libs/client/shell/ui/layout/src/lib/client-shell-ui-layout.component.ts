import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ClientShellFeatureModule } from '@nx-demo/client-shell-feature';
import { ClientShellUiHeaderComponent } from '@nx-demo/client-shell-ui-header';
import { ClientShellUiSidenavComponent } from '@nx-demo/client-shell-ui-sidenav';

@Component({
  selector: 'nx-demo-client-shell-ui-layout',
  standalone: true,
  imports: [
    ClientShellFeatureModule,
    ClientShellUiHeaderComponent,
    ClientShellUiSidenavComponent,
  ],
  templateUrl: './client-shell-ui-layout.component.html',
  styleUrl: './client-shell-ui-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientShellUiLayoutComponent { }

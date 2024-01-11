import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ClientLayoutUiHeaderComponent } from '@nx-demo/client-layout-ui-header';
import { ClientLayoutUiSidenavComponent } from '@nx-demo/client-layout-ui-sidenav';
import { SHARED_MODULES } from '@nx-demo/client-shared-constants';

@Component({
  selector: 'nx-demo-client-layout-feature',
  standalone: true,
  imports: [
    SHARED_MODULES,
    ClientLayoutUiHeaderComponent,
    ClientLayoutUiSidenavComponent,
  ],
  templateUrl: './client-layout-feature.component.html',
  styleUrl: './client-layout-feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientLayoutFeatureComponent { }

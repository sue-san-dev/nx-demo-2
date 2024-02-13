import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SHARED_MODULES } from '@nx-demo/client-shared-modules';

@Component({
  selector: 'nx-demo-client-login-feature',
  standalone: true,
  imports: [
    SHARED_MODULES,
  ],
  templateUrl: './client-login-feature.component.html',
  styleUrl: './client-login-feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientLoginFeatureComponent { }

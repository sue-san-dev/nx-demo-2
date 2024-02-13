import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SHARED_MODULES } from '@nx-demo/client-shared-modules';

@Component({
  selector: 'nx-demo-client-channel-ui-tab-home',
  standalone: true,
  imports: [
    SHARED_MODULES,
  ],
  templateUrl: './client-channel-ui-tab-home.component.html',
  styleUrl: './client-channel-ui-tab-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientChannelUiTabHomeComponent {}

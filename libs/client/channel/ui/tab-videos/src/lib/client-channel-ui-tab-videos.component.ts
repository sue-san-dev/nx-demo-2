import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SHARED_MODULES } from '@nx-demo/client-shared-modules';

@Component({
  selector: 'nx-demo-client-channel-ui-tab-videos',
  standalone: true,
  imports: [
    SHARED_MODULES,
  ],
  templateUrl: './client-channel-ui-tab-videos.component.html',
  styleUrl: './client-channel-ui-tab-videos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientChannelUiTabVideosComponent {}

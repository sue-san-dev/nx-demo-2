import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SHARED_MODULES } from '@nx-demo/client-shared-modules';
import { IWatchData } from '@nx-demo/client-shared-resolvers';
import { ClientSharedUiAvatarIconComponent } from '@nx-demo/client-shared-ui-avatar-icon';
import { VideoMetadataDetail } from '@nx-demo/shared-domain';

@Component({
  selector: 'nx-demo-client-watch-feature',
  standalone: true,
  imports: [
    SHARED_MODULES,
    ClientSharedUiAvatarIconComponent,
  ],
  templateUrl: './client-watch-feature.component.html',
  styleUrl: './client-watch-feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientWatchFeatureComponent {
  /** resolve結果をinput */
  readonly videoRef = input.required<VideoMetadataDetail, IWatchData>({
    alias: 'resolvedData',
    transform: data => data.video,
  });
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SHARED_MODULES } from '@nx-demo/client-shared-modules';
import { IBrowseData } from '@nx-demo/client-shared-resolvers';
import { ClientSharedUiRichItemComponent } from '@nx-demo/client-shared-ui-rich-item';
import { VideoMetadata } from '@nx-demo/shared-domain';

@Component({
  selector: 'nx-demo-client-browse-feature',
  standalone: true,
  imports: [
    SHARED_MODULES,
    ClientSharedUiRichItemComponent,
  ],
  templateUrl: './client-browse-feature.component.html',
  styleUrl: './client-browse-feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientBrowseFeatureComponent {
  /** resolve結果をinput */
  readonly videosRef = input.required<VideoMetadata[], IBrowseData>({
    alias: 'resolvedData',
    transform: data => data.videos,
  });
}

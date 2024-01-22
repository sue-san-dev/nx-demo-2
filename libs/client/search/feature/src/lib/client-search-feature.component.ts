import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SHARED_MODULES } from '@nx-demo/client-shared-modules';
import { ISearchData } from '@nx-demo/client-shared-resolvers';
import { ClientSharedUiRichItemComponent } from '@nx-demo/client-shared-ui-rich-item';
import { VideoMetadata } from '@nx-demo/shared-domain';

@Component({
  selector: 'nx-demo-client-search-feature',
  standalone: true,
  imports: [
    SHARED_MODULES,
    ClientSharedUiRichItemComponent,
  ],
  templateUrl: './client-search-feature.component.html',
  styleUrl: './client-search-feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientSearchFeatureComponent {
  /** resolve結果をinput */
  readonly videosRef = input.required<VideoMetadata[], ISearchData>({
    alias: 'resolvedData',
    transform: data => data.videos,
  });
}

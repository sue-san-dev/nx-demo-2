import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { SHARED_MODULES } from '@nx-demo/client-shared-modules';
import { IBrowseData } from '@nx-demo/client-shared-resolvers';
import { ClientSharedUiRichItemComponent } from '@nx-demo/client-shared-ui-rich-item';

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
  /** resolveデータ */
  readonly resolvedData = input.required<IBrowseData>();
  /** ビデオ一覧 */
  readonly videos = computed(() => this.resolvedData().videos);
}

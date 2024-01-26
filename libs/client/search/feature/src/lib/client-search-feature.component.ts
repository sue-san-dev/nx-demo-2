import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { SHARED_MODULES } from '@nx-demo/client-shared-modules';
import { ISearchData } from '@nx-demo/client-shared-resolvers';
import { ClientSharedUiRichItemComponent } from '@nx-demo/client-shared-ui-rich-item';

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
  /** resolveデータ */
  readonly resolvedData = input.required<ISearchData>();
  /** ビデオ一覧 */
  readonly videosRef = computed(() => this.resolvedData().videos);
}

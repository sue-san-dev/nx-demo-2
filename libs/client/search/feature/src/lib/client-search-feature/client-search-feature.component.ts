import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SHARED_MODULES } from '@nx-demo/client-shared-modules';
import { ISearchData } from '@nx-demo/client-shared-resolvers';
import { ClientSharedUiRichItemComponent } from '@nx-demo/client-shared-ui-rich-item';
import { map } from 'rxjs';

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

  readonly #route = inject(ActivatedRoute);

  readonly videosRef$ = this.#route.data.pipe(
    map(data => {
      return (data as { resolvedData: ISearchData }).resolvedData.videos
    })
  );
}

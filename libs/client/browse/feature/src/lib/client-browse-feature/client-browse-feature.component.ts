import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SHARED_MODULES } from '@nx-demo/client-shared-modules';
import { IBrowseData } from '@nx-demo/client-shared-resolvers';
import { ClientSharedUiRichItemComponent } from '@nx-demo/client-shared-ui-rich-item';
import { map } from 'rxjs';

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

  readonly #route = inject(ActivatedRoute);

  readonly videosRef$ = this.#route.data.pipe(
    map(data => {
      return (data as { resolvedData: IBrowseData }).resolvedData.videos
    })
  );
}

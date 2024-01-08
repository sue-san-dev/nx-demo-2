import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBrowseData } from '@nx-demo/client-shared-resolvers';
import { map } from 'rxjs';

@Component({
  selector: 'nx-demo-client-browse-feature',
  standalone: true,
  imports: [
    AsyncPipe,
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

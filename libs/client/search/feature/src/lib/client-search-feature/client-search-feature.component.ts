import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISearchData } from '@nx-demo/client-shared-resolvers';
import { map } from 'rxjs';

@Component({
  selector: 'nx-demo-client-search-feature',
  standalone: true,
  imports: [
    AsyncPipe,
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

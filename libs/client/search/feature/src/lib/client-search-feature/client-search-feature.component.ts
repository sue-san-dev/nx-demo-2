import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISearchData } from '@nx-demo/client-shared-resolvers';

@Component({
  selector: 'nx-demo-client-search-feature',
  standalone: true,
  imports: [

  ],
  templateUrl: './client-search-feature.component.html',
  styleUrl: './client-search-feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientSearchFeatureComponent {
  readonly #route = inject(ActivatedRoute);
  readonly #data: ISearchData = this.#route.snapshot.data['data'];
  readonly videosRef = this.#data.videos;
}

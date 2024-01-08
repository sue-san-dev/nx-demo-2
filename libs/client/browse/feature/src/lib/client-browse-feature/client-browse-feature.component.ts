import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBrowseData } from '@nx-demo/client-shared-resolvers';

@Component({
  selector: 'nx-demo-client-browse-feature',
  standalone: true,
  imports: [
  ],
  templateUrl: './client-browse-feature.component.html',
  styleUrl: './client-browse-feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientBrowseFeatureComponent {
  readonly #route = inject(ActivatedRoute);
  readonly #data: IBrowseData = this.#route.snapshot.data['data'];
  readonly videosRef = this.#data.videos;
}

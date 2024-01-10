import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBrowseData } from '@nx-demo/client-shared-resolvers';
import { ClientShellFeatureModule } from '@nx-demo/client-shell-feature';
import { map } from 'rxjs';

@Component({
  selector: 'nx-demo-client-browse-feature',
  standalone: true,
  imports: [
    ClientShellFeatureModule,
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

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SHARED_MODULES } from '@nx-demo/client-shared-modules';
import { ClientLayoutUiSearchboxComponent } from '@nx-demo/client-layout-ui-searchbox';

@Component({
  selector: 'nx-demo-client-layout-ui-header',
  standalone: true,
  imports: [
    SHARED_MODULES,
    ClientLayoutUiSearchboxComponent,
  ],
  templateUrl: './client-layout-ui-header.component.html',
  styleUrl: './client-layout-ui-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientLayoutUiHeaderComponent {

  readonly #router = inject(Router);

  onClickLogo() {
    this.#router.navigateByUrl('/', {
      onSameUrlNavigation: 'reload',
    });
  }
}

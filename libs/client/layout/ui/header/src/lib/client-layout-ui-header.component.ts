import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SHARED_MODULES } from '@nx-demo/client-shared-modules';
import { ClientLayoutUiSearchboxComponent } from '@nx-demo/client-layout-ui-searchbox';
import { AuthStore } from '@nx-demo/client-shared-stores';
import { ClientSharedUiAvatarIconComponent } from '@nx-demo/client-shared-ui-avatar-icon';

@Component({
  selector: 'nx-demo-client-layout-ui-header',
  standalone: true,
  imports: [
    SHARED_MODULES,
    ClientLayoutUiSearchboxComponent,
    ClientSharedUiAvatarIconComponent,
  ],
  templateUrl: './client-layout-ui-header.component.html',
  styleUrl: './client-layout-ui-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientLayoutUiHeaderComponent {

  readonly #router = inject(Router);
  readonly authStore = inject(AuthStore);

  onClickLogo() {
    this.#router.navigateByUrl('/', {
      onSameUrlNavigation: 'reload',
    });
  }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UrlUtil } from '@nx-demo/shared-utils';
import { ClientShellFeatureModule } from '@nx-demo/client-shell-feature';

@Component({
  selector: 'nx-demo-client-shell-ui-header',
  standalone: true,
  imports: [
    ClientShellFeatureModule,
  ],
  templateUrl: './client-shell-ui-header.component.html',
  styleUrl: './client-shell-ui-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientShellUiHeaderComponent {

  readonly #router = inject(Router);
  readonly #fb = inject(FormBuilder);

  keywordCtrl = this.#fb.control('', [Validators.required]);

  onClickLogo() {
    this.#router.navigateByUrl('/', {
      onSameUrlNavigation: 'reload',
    });
  }

  /** 検索ボタン押下時ハンドラ */
  onClickSearch() {
    if (this.keywordCtrl.invalid) return;

    this.#router.navigate(['/', UrlUtil.Result], {
      queryParams: { [UrlUtil.SearchQuery]: this.keywordCtrl.value },
      onSameUrlNavigation: 'reload',
    });
  }
}

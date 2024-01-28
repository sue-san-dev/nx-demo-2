import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SHARED_MODULES } from '@nx-demo/client-shared-modules';
import { UrlUtil } from '@nx-demo/shared-utils';

@Component({
  selector: 'nx-demo-client-layout-ui-searchbox',
  standalone: true,
  imports: [
    SHARED_MODULES,
  ],
  templateUrl: './client-layout-ui-searchbox.component.html',
  styleUrl: './client-layout-ui-searchbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientLayoutUiSearchboxComponent {

  readonly #fb = inject(FormBuilder);
  readonly #router = inject(Router);

  keywordCtrl = this.#fb.control('', [Validators.required]);

  /** 検索ボタン押下時ハンドラ */
  onClickSearch() {
    if (this.keywordCtrl.invalid) return;

    this.#router.navigate(['/', UrlUtil.Result], {
      queryParams: { [UrlUtil.SearchQuery]: this.keywordCtrl.value },
      onSameUrlNavigation: 'reload',
    });
  }
}

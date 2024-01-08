import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UrlUtil } from '@nx-demo/shared-utils';

@Component({
  selector: 'nx-demo-client-shell-ui-header',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './client-shell-ui-header.component.html',
  styleUrl: './client-shell-ui-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientShellUiHeaderComponent {

  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);
  readonly #fb = inject(FormBuilder);

  keywordCtrl = this.#fb.control('', [Validators.required]);

  /** 検索ボタン押下時ハンドラ */
  onClickSearch() {
    if (this.keywordCtrl.invalid) return;

    this.#router.navigate(['./', UrlUtil.Result], {
      relativeTo: this.#route,
      queryParams: { [UrlUtil.SearchQuery]: this.keywordCtrl.value },
    });
  }
}

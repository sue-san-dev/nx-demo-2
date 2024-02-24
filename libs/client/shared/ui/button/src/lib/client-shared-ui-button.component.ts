import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { SHARED_MODULES } from '@nx-demo/client-shared-modules';

@Component({
  selector: 'nx-demo-client-shared-ui-button',
  standalone: true,
  imports: [ ],
  templateUrl: './client-shared-ui-button.component.html',
  styleUrl: './client-shared-ui-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientSharedUiButtonComponent {

  /**
   * ボタンタイプ
   * normal: 通常
   * ghost: 薄い背景色
   * inverse: 反転
   */
  variant = input.required<'normal' | 'ghost' | 'inverse'>();
}

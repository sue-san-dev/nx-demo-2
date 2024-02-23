import { ChangeDetectionStrategy, Component, booleanAttribute, input, numberAttribute } from '@angular/core';
import { IVideoMetadata } from '@nx-demo/shared-domain';
import { SHARED_MODULES } from '@nx-demo/client-shared-modules';
import { UrlUtil } from '@nx-demo/shared-utils';
import { Params } from '@angular/router';
import { ClientSharedUiAvatarIconComponent } from '@nx-demo/client-shared-ui-avatar-icon';
import { BooleanInput, NumberInput } from '@angular/cdk/coercion';

@Component({
  selector: 'nx-demo-client-shared-ui-rich-item',
  standalone: true,
  imports: [
    SHARED_MODULES,
    ClientSharedUiAvatarIconComponent,
  ],
  templateUrl: './client-shared-ui-rich-item.component.html',
  styleUrl: './client-shared-ui-rich-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientSharedUiRichItemComponent {
  /** ビデオ */
  readonly video = input.required<IVideoMetadata>();
  /** サムネとメタ情報を横並び */
  readonly horizontal = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
  /** 縮小表示 */
  readonly minimal = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
  /** サムネ幅.px */
  readonly thumbnailWidth = input.required<number, NumberInput>({ transform: numberAttribute });
  /** サムネ高さ.px */
  readonly thumbnailHeight = input.required<number, NumberInput>({ transform: numberAttribute });

  get watchPageUrl(): string {
    return '/' + UrlUtil.watch;
  }
  get watchPageQueryParams(): Params {
    return { [UrlUtil.videoKey]: this.video().uuid };
  }
}

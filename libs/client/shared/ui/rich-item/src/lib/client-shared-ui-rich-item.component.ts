import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IVideoMetadata } from '@nx-demo/shared-domain';
import { SHARED_MODULES } from '@nx-demo/client-shared-modules';
import { UrlUtil } from '@nx-demo/shared-utils';
import { Params } from '@angular/router';
import { ClientSharedUiAvatarIconComponent } from '@nx-demo/client-shared-ui-avatar-icon';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

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
  readonly videoRef = input.required<IVideoMetadata>({
    alias: 'video',
  });
  /** サムネとメタ情報を横並び */
  readonly isHorizontal = input<boolean, BooleanInput>(false, {
    alias: 'horizontal',
    transform: coerceBooleanProperty,
  });
  /** 縮小表示 */
  readonly isMinimal = input<boolean, BooleanInput>(false, {
    alias: 'minimal',
    transform: coerceBooleanProperty,
  });
  /** サムネ幅.px */
  readonly thumbnailWidth = input.required<string>();
  /** サムネ高さ.px */
  readonly thumbnailHeight = input.required<string>();

  get watchPageUrl(): string {
    return '/' + UrlUtil.Watch;
  }
  get watchPageQueryParams(): Params {
    return { [UrlUtil.VideoKey]: this.videoRef().uuid };
  }
}

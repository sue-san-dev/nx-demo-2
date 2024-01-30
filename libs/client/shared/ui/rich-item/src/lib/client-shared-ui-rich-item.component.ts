import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { VideoMetadata } from '@nx-demo/shared-domain';
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
  readonly videoRef = input.required<VideoMetadata>({
    alias: 'video',
  });
  /** 関連動画用のコンパクト表示 */
  readonly isCompact = input<boolean, BooleanInput>(false, {
    alias: 'compact',
    transform: coerceBooleanProperty,
  });

  get watchPageUrl(): string {
    return '/' + UrlUtil.Watch;
  }
  get watchPageQueryParams(): Params {
    return { [UrlUtil.VideoKey]: this.videoRef().uuid };
  }

  get thumbnailWidth(): number {
    return this.isCompact() ? 168 : 320;
  }
  get thumbnailHeight(): number {
    return this.isCompact() ? 94 : 180;
  }
}

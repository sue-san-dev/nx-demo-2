import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { VideoMetadata } from '@nx-demo/shared-domain';
import { SHARED_MODULES } from '@nx-demo/client-shared-modules';
import { UrlUtil } from '@nx-demo/shared-utils';
import { Params } from '@angular/router';
import { ClientSharedUiAvatarIconComponent } from '@nx-demo/client-shared-ui-avatar-icon';

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

  get watchPageUrl(): string {
    return '/' + UrlUtil.Watch;
  }
  get watchPageQueryParams(): Params {
    return { [UrlUtil.VideoKey]: this.videoRef().uuid };
  }
}

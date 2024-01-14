import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { VideoInfo } from '@nx-demo/shared-domain';
import { SHARED_MODULES } from '@nx-demo/client-shared-modules';
import { UrlUtil } from '@nx-demo/shared-utils';
import { Params } from '@angular/router';

@Component({
  selector: 'nx-demo-client-shared-ui-rich-item',
  standalone: true,
  imports: [
    SHARED_MODULES,
    NgOptimizedImage,
  ],
  templateUrl: './client-shared-ui-rich-item.component.html',
  styleUrl: './client-shared-ui-rich-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientSharedUiRichItemComponent {

  @Input({ required: true }) video!: VideoInfo;

  get routerLink(): string {
    return '/' + UrlUtil.Watch;
  }
  get queryParams(): Params {
    return { [UrlUtil.VideoKey]: this.video.uuid };
  }
}

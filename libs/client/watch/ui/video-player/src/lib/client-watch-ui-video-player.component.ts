import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';
import { SHARED_MODULES } from '@nx-demo/client-shared-modules';
import { IVideoMetadataDetail } from '@nx-demo/shared-domain';

@Component({
  selector: 'nx-demo-client-watch-ui-video-player',
  standalone: true,
  imports: [
    SHARED_MODULES,
  ],
  templateUrl: './client-watch-ui-video-player.component.html',
  styleUrl: './client-watch-ui-video-player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // shadow dom化することでreest cssの影響を受けないようにする
  encapsulation: ViewEncapsulation.ShadowDom,
  schemas: [
    // media-chrome要素（media-controllerなど）を使用するために必要
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class ClientWatchUiVideoPlayerComponent {

  video = input.required<IVideoMetadataDetail>();
}

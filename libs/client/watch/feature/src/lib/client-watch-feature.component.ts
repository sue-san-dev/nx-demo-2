import { ChangeDetectionStrategy, Component, ElementRef, computed, effect, inject, input, viewChild } from '@angular/core';
import { SHARED_MODULES } from '@nx-demo/client-shared-modules';
import { IWatchData } from '@nx-demo/client-shared-resolvers';
import { CommentService } from '@nx-demo/client-shared-services';
import { ClientSharedUiAvatarIconComponent } from '@nx-demo/client-shared-ui-avatar-icon';
import { ClientSharedUiCommentComponent } from '@nx-demo/client-shared-ui-comment';
import { ClientSharedUiRichItemComponent } from '@nx-demo/client-shared-ui-rich-item';
import { IComment } from '@nx-demo/shared-domain';
import { computedAsync } from 'ngxtension/computed-async';
import { startWith } from 'rxjs';
import * as dashjs from 'dashjs';

@Component({
  selector: 'nx-demo-client-watch-feature',
  standalone: true,
  imports: [
    SHARED_MODULES,
    ClientSharedUiAvatarIconComponent,
    ClientSharedUiRichItemComponent,
    ClientSharedUiCommentComponent,
  ],
  templateUrl: './client-watch-feature.component.html',
  styleUrl: './client-watch-feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientWatchFeatureComponent {

  readonly #commentService = inject(CommentService);

  /** video要素 */
  readonly videoPlayer = viewChild.required<ElementRef<HTMLMediaElement>>('videoPlayer');
  /** resolveデータ */
  readonly resolvedData = input.required<IWatchData>();
  /** ビデオ */
  readonly video = computed(() => this.resolvedData().video);
  /** 関連ビデオリスト */
  readonly relatedVideos = computed(() => this.resolvedData().relatedVideos);
  /** コメントリスト */
  readonly comments = computedAsync<IComment[]>(() => {
    return this.#commentService.getComments(this.video().uuid, 0).pipe(startWith([]));
  }, {
    initialValue: [],
  });

  constructor() {
    // player初期化
    effect(() => {
      const player = dashjs.MediaPlayer().create();
      const url = this.video().manifestUrl;
      const autoPlay = true;
      const startTime = 0;
      player.initialize(this.videoPlayer().nativeElement, url, autoPlay, startTime);
    });
  }
}

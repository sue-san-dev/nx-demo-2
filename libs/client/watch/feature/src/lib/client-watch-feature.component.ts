import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { SHARED_MODULES } from '@nx-demo/client-shared-modules';
import { IWatchData } from '@nx-demo/client-shared-resolvers';
import { CommentService } from '@nx-demo/client-shared-services';
import { ClientSharedUiAvatarIconComponent } from '@nx-demo/client-shared-ui-avatar-icon';
import { ClientSharedUiCommentComponent } from '@nx-demo/client-shared-ui-comment';
import { ClientSharedUiRichItemComponent } from '@nx-demo/client-shared-ui-rich-item';
import { ClientWatchUiVideoPlayerComponent } from '@nx-demo/client-watch-ui-video-player';
import { IComment } from '@nx-demo/shared-domain';
import { computedAsync } from 'ngxtension/computed-async';
import { startWith } from 'rxjs';
import 'media-chrome';
import '@luwes/dash-video-element';

@Component({
  selector: 'nx-demo-client-watch-feature',
  standalone: true,
  imports: [
    SHARED_MODULES,
    ClientSharedUiAvatarIconComponent,
    ClientSharedUiRichItemComponent,
    ClientSharedUiCommentComponent,
    ClientWatchUiVideoPlayerComponent,
  ],
  templateUrl: './client-watch-feature.component.html',
  styleUrl: './client-watch-feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientWatchFeatureComponent {

  readonly #commentService = inject(CommentService);

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
}

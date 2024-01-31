import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { SHARED_MODULES } from '@nx-demo/client-shared-modules';
import { IWatchData } from '@nx-demo/client-shared-resolvers';
import { CommentService } from '@nx-demo/client-shared-services';
import { ClientSharedUiAvatarIconComponent } from '@nx-demo/client-shared-ui-avatar-icon';
import { ClientSharedUiCommentComponent } from '@nx-demo/client-shared-ui-comment';
import { ClientSharedUiRichItemComponent } from '@nx-demo/client-shared-ui-rich-item';
import { IComment } from '@nx-demo/shared-domain';
import { computedAsync } from 'ngxtension/computed-async';
import { concat, of } from 'rxjs';

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

  commentService = inject(CommentService);

  /** resolveデータ */
  readonly resolvedData = input.required<IWatchData>();
  /** ビデオ */
  readonly videoRef = computed(() => this.resolvedData().video);
  /** 関連ビデオリスト */
  readonly relatedVideosRef = computed(() => this.resolvedData().relatedVideos);
  /** コメントリスト */
  readonly commentsRef = computedAsync<IComment[]>(() => {
    // 再初期化後、コメントリスト取得
    return concat(
      of([]),
      this.commentService.getComments(this.videoRef().uuid, 0),
    );
  }, {
    initialValue: [],
  });
}

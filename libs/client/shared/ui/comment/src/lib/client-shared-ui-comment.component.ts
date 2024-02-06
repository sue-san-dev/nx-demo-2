import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { SHARED_MODULES } from '@nx-demo/client-shared-modules';
import { IComment } from '@nx-demo/shared-domain';
import { ClientSharedUiAvatarIconComponent } from '@nx-demo/client-shared-ui-avatar-icon';
import { CommentService } from '@nx-demo/client-shared-services';

@Component({
  selector: 'nx-demo-client-shared-ui-comment',
  standalone: true,
  imports: [
    SHARED_MODULES,
    ClientSharedUiAvatarIconComponent,
  ],
  templateUrl: './client-shared-ui-comment.component.html',
  styleUrl: './client-shared-ui-comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientSharedUiCommentComponent {

  readonly #commentService = inject(CommentService);

  /** コメント */
  commentRef = input.required<IComment>({
    alias: 'comment',
  });
  /** 子コメントリストを表示するか */
  showChildComments = signal<boolean>(false);
  /** 子コメントリスト */
  childComments = signal<IComment[]>([]);

  /** 子コメント表示切り替え */
  onToggleChildCommentsDisplay() {
    if (this.childComments().length) {
      this.showChildComments.set(!this.showChildComments());
    } else {
      if (this.showChildComments()) return;
      this.showChildComments.set(true);

      this.#commentService.getComments(this.commentRef().videoUuid, 0, this.commentRef().id)
        .subscribe(childComments => {
          this.childComments.set(childComments);
        });
    }
  }
}

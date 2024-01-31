import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SHARED_MODULES } from '@nx-demo/client-shared-modules';
import { IComment } from '@nx-demo/shared-domain';
import { ClientSharedUiAvatarIconComponent } from '@nx-demo/client-shared-ui-avatar-icon';

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
  /** コメント */
  commentRef = input.required<IComment>({
    alias: 'comment',
  });
}

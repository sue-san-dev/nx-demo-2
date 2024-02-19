import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SHARED_MODULES } from '@nx-demo/client-shared-modules';
import { IUser } from '@nx-demo/shared-domain';

@Component({
  selector: 'nx-demo-client-shared-ui-avatar-icon',
  standalone: true,
  imports: [
    SHARED_MODULES,
  ],
  templateUrl: './client-shared-ui-avatar-icon.component.html',
  styleUrl: './client-shared-ui-avatar-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientSharedUiAvatarIconComponent {
  /** ユーザ */
  readonly user = input.required<IUser>();
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nx-demo-client-shared-ui-avatar-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-shared-ui-avatar-icon.component.html',
  styleUrl: './client-shared-ui-avatar-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientSharedUiAvatarIconComponent {}

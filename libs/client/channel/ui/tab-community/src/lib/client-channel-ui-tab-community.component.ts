import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nx-demo-client-channel-ui-tab-community',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-channel-ui-tab-community.component.html',
  styleUrl: './client-channel-ui-tab-community.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientChannelUiTabCommunityComponent {}

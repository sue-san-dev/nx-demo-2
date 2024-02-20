import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nx-demo-client-channel-ui-tab-videos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-channel-ui-tab-videos.component.html',
  styleUrl: './client-channel-ui-tab-videos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientChannelUiTabVideosComponent {}

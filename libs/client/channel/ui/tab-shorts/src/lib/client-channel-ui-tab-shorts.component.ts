import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nx-demo-client-channel-ui-tab-shorts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-channel-ui-tab-shorts.component.html',
  styleUrl: './client-channel-ui-tab-shorts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientChannelUiTabShortsComponent {}

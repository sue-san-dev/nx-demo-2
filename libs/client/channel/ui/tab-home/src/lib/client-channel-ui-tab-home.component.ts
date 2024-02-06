import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nx-demo-client-channel-ui-tab-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-channel-ui-tab-home.component.html',
  styleUrl: './client-channel-ui-tab-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientChannelUiTabHomeComponent {}

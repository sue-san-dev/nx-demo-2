import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nx-demo-client-channel-ui-tab-lives',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-channel-ui-tab-lives.component.html',
  styleUrl: './client-channel-ui-tab-lives.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientChannelUiTabLivesComponent {}

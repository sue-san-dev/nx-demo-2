import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nx-demo-client-channel-ui-tab-playlists',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-channel-ui-tab-playlists.component.html',
  styleUrl: './client-channel-ui-tab-playlists.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientChannelUiTabPlaylistsComponent {}

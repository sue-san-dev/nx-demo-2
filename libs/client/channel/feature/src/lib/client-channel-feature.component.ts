import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nx-demo-client-channel-feature',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-channel-feature.component.html',
  styleUrl: './client-channel-feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientChannelFeatureComponent {}

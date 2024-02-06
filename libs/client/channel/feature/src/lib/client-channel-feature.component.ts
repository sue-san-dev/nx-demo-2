import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nx-demo-client-channel-feature',
  standalone: true,
  imports: [

  ],
  templateUrl: './client-channel-feature.component.html',
  styleUrl: './client-channel-feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientChannelFeatureComponent { }

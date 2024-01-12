import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { VideoInfo } from '@nx-demo/shared-domain';

@Component({
  selector: 'nx-demo-client-shared-ui-rich-item',
  standalone: true,
  imports: [
    NgOptimizedImage,
  ],
  templateUrl: './client-shared-ui-rich-item.component.html',
  styleUrl: './client-shared-ui-rich-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientSharedUiRichItemComponent {

  @Input({ required: true }) video!: VideoInfo;
}

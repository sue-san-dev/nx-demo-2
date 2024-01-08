import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nx-demo-client-shell-ui-header',
  standalone: true,
  imports: [
  ],
  templateUrl: './client-shell-ui-header.component.html',
  styleUrl: './client-shell-ui-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientShellUiHeaderComponent { }

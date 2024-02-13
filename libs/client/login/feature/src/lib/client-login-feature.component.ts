import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nx-demo-client-login-feature',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-login-feature.component.html',
  styleUrl: './client-login-feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientLoginFeatureComponent {}

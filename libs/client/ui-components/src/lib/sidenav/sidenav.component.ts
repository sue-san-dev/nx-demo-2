import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nx-demo-sidenav',
  standalone: true,
  imports: [
    
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {}

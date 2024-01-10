import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ClientShellFeatureModule } from '@nx-demo/client-shell-feature';

@Component({
  standalone: true,
  imports: [
    ClientShellFeatureModule,
  ],
  selector: 'nx-demo-root',
  template: `<router-outlet />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent { }

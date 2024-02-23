import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SHARED_MODULES } from '@nx-demo/client-shared-modules';

@Component({
  standalone: true,
  imports: [
    SHARED_MODULES,
  ],
  selector: 'nx-demo-root',
  template: `<router-outlet />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent { }

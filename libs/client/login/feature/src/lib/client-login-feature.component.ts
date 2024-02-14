import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SHARED_MODULES } from '@nx-demo/client-shared-modules';
import { AuthStore } from '@nx-demo/client-shared-stores';

@Component({
  selector: 'nx-demo-client-login-feature',
  standalone: true,
  imports: [
    SHARED_MODULES,
  ],
  templateUrl: './client-login-feature.component.html',
  styleUrl: './client-login-feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientLoginFeatureComponent {

  readonly fb = inject(FormBuilder);
  readonly authStore = inject(AuthStore);

  readonly loginForm = this.fb.nonNullable.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required],
  });

  login() {
    const { email, password } = this.loginForm.getRawValue();
    this.authStore.login({ email, password });
  }
}

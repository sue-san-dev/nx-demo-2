import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IHomeData, RESOLVED_DATA } from '@nx-demo/resolvers';

@Component({
  selector: 'nx-demo-home',
  standalone: true,
  imports: [
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly #route = inject(ActivatedRoute);
  readonly #data: IHomeData = this.#route.snapshot.data[RESOLVED_DATA];
  readonly userRef = this.#data.user;
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IHomeData } from '@nx-demo/resolvers';

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
  readonly #data: IHomeData = this.#route.snapshot.data['data'];
  readonly userRef = this.#data.user;
}

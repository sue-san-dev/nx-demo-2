import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IHomeData } from './home.resolver';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'nx-demo-home',
  standalone: true,
  imports: [
    JsonPipe
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

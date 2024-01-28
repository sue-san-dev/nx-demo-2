import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCount',
  pure: true,
  standalone: true,
})
export class FormatCountPipe implements PipeTransform {
  readonly #TEN_THOUSAND = 10000;
  readonly #ONE_HUNDRED_MILLION = 100000000;

  transform(viewCount: number): string {
    if (viewCount < this.#TEN_THOUSAND) {
      return `${ viewCount }`;
    } else if (viewCount < this.#ONE_HUNDRED_MILLION) {
      return `${ this.#formatCount(viewCount, this.#TEN_THOUSAND) }万`;
    } else {
      return `${ this.#formatCount(viewCount, this.#ONE_HUNDRED_MILLION) }億`;
    }
  }

  #formatCount(count: number, divisor: number): number {
    return Math.floor((count / divisor) * 10) / 10;
  }
}
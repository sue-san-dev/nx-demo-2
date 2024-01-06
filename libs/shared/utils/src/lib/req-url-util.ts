import { environment } from '@nx-demo/environments';
import { UrlUtil } from './url-util';

export class ReqUrlUtil {
  static readonly #baseUrl = environment.apiUrl;

  static getUserUrl(userId: number) {
    return `${ this.#baseUrl }/${ UrlUtil.Users }/${ userId }`;
  }
}

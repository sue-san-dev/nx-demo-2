import { environment } from '@nx-demo/shared-environments';
import { UrlUtil } from './url-util';

export class ReqUrlUtil {
  static readonly #baseUrl = environment.apiUrl;

  static getBrowseUrl() {
    return `${ this.#baseUrl }/${ UrlUtil.Browse }`;
  }

  static getSearchUrl() {
    return `${ this.#baseUrl }/${ UrlUtil.Search }`;
  }
}

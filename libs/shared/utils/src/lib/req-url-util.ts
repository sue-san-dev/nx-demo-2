import { RouterUtil } from './router-util';

export class ReqUrlUtil {
  static getUserUrl(userId: number) {
    return `/${ RouterUtil.Configuration.Users }/${ userId }`;
  }
}

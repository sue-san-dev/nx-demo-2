import { UrlUtil } from './url-util';

export class ReqUrlUtil {

  static readonly auth = {
    login: `/${ UrlUtil.auth }/login`,
    logout: `/${ UrlUtil.auth }/logout`,
  } as const;

  static readonly browse = {
    root: `/${ UrlUtil.browse }`,
  } as const;

  static readonly search = {
    root: `/${ UrlUtil.search }`,
  } as const;

  static readonly video = {
    root: `/${ UrlUtil.video }`,
    comments: `/${ UrlUtil.video }/comments`,
    relatedVideos: `/${ UrlUtil.video }/relatedVideos`,
  } as const;
}

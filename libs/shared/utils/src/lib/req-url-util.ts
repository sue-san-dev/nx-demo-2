import { UrlUtil } from './url-util';

export class ReqUrlUtil {

  static readonly browse = {
    root: `/${ UrlUtil.Browse }`,
  } as const;

  static readonly search = {
    root: `/${ UrlUtil.Search }`,
  } as const;

  static readonly video = {
    root: `/${ UrlUtil.Video }`,
    comments: `/${ UrlUtil.Video }/comments`,
    relatedVideos: `/${ UrlUtil.Video }/relatedVideos`,
  } as const;
}

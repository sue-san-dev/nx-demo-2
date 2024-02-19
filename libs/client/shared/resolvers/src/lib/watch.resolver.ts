import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { VideoService } from '@nx-demo/client-shared-services';
import { IVideoMetadata, IVideoMetadataDetail } from '@nx-demo/shared-domain';
import { UrlUtil } from '@nx-demo/shared-utils';
import { forkJoin } from 'rxjs';

export interface IWatchData {
  video: IVideoMetadataDetail;
  relatedVideos: IVideoMetadata[];
}

export const watchResolver: ResolveFn<IWatchData> = (route) => {
  const videoService = inject(VideoService);
  const videoKey = route.queryParamMap.get(UrlUtil.videoKey);
  if (videoKey == null) throw new Error();

  return forkJoin({
    video: videoService.getVideo(videoKey),
    relatedVideos: videoService.getRelatedVideos(videoKey, 0),
  });
}

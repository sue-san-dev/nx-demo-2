import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { VideoService } from '@nx-demo/client-shared-services';
import { VideoMetadata, VideoMetadataDetail } from '@nx-demo/shared-domain';
import { UrlUtil } from '@nx-demo/shared-utils';
import { forkJoin, map } from 'rxjs';

export interface IWatchData {
  video: VideoMetadataDetail;
  relatedVideos: VideoMetadata[];
}

export const watchResolver: ResolveFn<IWatchData> = (route) => {
  const videoService = inject(VideoService);
  const videoKey = route.queryParamMap.get(UrlUtil.VideoKey);
  if (videoKey == null) throw new Error();

  return forkJoin([
    videoService.getVideo(videoKey),
    videoService.getRelatedVideos(videoKey, 0),
  ]).pipe(
    map(([video, relatedVideos]) => {
      return {
        video,
        relatedVideos,
      }
    })
  );
}

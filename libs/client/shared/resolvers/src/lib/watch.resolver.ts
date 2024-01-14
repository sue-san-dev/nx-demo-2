import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { VideoService } from '@nx-demo/client-shared-services';
import { VideoInfo } from '@nx-demo/shared-domain';
import { UrlUtil } from '@nx-demo/shared-utils';
import { map } from 'rxjs';

export interface IWatchData {
  video: VideoInfo;
}

export const watchResolver: ResolveFn<IWatchData> = (route) => {
  const videoService = inject(VideoService);
  const videoKey = route.queryParamMap.get(UrlUtil.VideoKey);
  if (videoKey == null) throw new Error();

  return videoService.getVideo(videoKey).pipe(
    map(video => {
      return {
        video,
      }
    })
  );
}

import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { BrowseService } from '@nx-demo/client-shared-services';
import { VideoInfo } from '@nx-demo/shared-domain';
import { map } from 'rxjs';

export interface IBrowseData {
  videos: VideoInfo[];
}

export const browseResolver: ResolveFn<IBrowseData> = () => {
  const browseService = inject(BrowseService);
  return browseService.browse().pipe(
    map(videos => {
      return {
        videos,
      }
    })
  );
}

import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { BrowseService } from '@nx-demo/client-shared-services';
import { IVideoMetadata } from '@nx-demo/shared-domain';
import { forkJoin } from 'rxjs';

export interface IBrowseData {
  videos: IVideoMetadata[];
}

export const browseResolver: ResolveFn<IBrowseData> = () => {
  const browseService = inject(BrowseService);

  return forkJoin({
    videos: browseService.browse(),
  });
}

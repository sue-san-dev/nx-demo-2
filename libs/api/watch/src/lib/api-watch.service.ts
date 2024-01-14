import { Injectable } from '@nestjs/common';
import { ApiPrismaService } from '@nx-demo/api-prisma';

@Injectable()
export class ApiWatchService {

  constructor(
    private apiPrismaService: ApiPrismaService,
  ) { }

  getVideo(videoKey: string) {
    return this.apiPrismaService.video.findUnique({
      where: {
        uuid: videoKey,
      },
      include: {
        uploader: true,
      }
    });
  }
}

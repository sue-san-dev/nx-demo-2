import { Injectable } from '@nestjs/common';
import { ApiPrismaService } from '@nx-demo/api-prisma';
import { PrismaExcludeUtil } from '@nx-demo/shared-utils';

@Injectable()
export class ApiBrowseService {

  constructor(
    private apiPrismaService: ApiPrismaService,
  ) { }

  browse() {
    return this.apiPrismaService.video.findMany({
      include: {
        uploader: {
          select: PrismaExcludeUtil.userWithoutPassword,
        },
      }
    });
  }
}

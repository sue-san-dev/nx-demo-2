import { Injectable } from '@nestjs/common';
import { ApiPrismaService } from '@nx-demo/api-prisma';
import { PrismaExcludeUtil } from '@nx-demo/shared-utils';

@Injectable()
export class ApiSearchService {

  constructor(
    private apiPrismaService: ApiPrismaService,
  ) { }

  search(searchQuery: string) {
    return this.apiPrismaService.video.findMany({
      where: {
        title: {
          contains: searchQuery,
        }
      },
      include: {
        uploader: {
          select: PrismaExcludeUtil.userWithoutPassword,
        },
      }
    });
  }
}

import { Injectable } from '@nestjs/common';
import { ApiPrismaService } from '@nx-demo/api-prisma';

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
        uploader: true,
      }
    });
  }
}

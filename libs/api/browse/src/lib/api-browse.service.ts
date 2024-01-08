import { Injectable } from '@nestjs/common';
import { ApiPrismaService } from '@nx-demo/api-prisma';

@Injectable()
export class ApiBrowseService {

  constructor(
    private apiPrismaService: ApiPrismaService,
  ) { }

  async browse() {
    return this.apiPrismaService.video.findMany();
  }
}

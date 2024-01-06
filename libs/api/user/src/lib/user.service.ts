import { Injectable } from '@nestjs/common';
import { PrismaService } from '@nx-demo/prisma';

@Injectable()
export class UserService {

  constructor(
    private prismaService: PrismaService,
  ) { }

  async getOne(userId: number) {
    return this.prismaService.user.findUnique({
      where: {
        id: userId,
      }
    })
  }
}

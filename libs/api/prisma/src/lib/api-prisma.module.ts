import { Module, Global } from '@nestjs/common';
import { ApiPrismaService } from './api-prisma.service';

@Global()
@Module({
  controllers: [],
  providers: [ApiPrismaService],
  exports: [ApiPrismaService],
})
export class ApiPrismaModule { }

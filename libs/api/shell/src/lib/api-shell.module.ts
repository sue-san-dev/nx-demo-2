import { Module } from '@nestjs/common';
import { ApiPrismaModule } from '@nx-demo/api-prisma';
import { ApiBrowseModule } from '@nx-demo/api-browse';

@Module({
  imports: [
    ApiPrismaModule,
    ApiBrowseModule,
  ],
})
export class ApiShellModule { }

import { Module } from '@nestjs/common';
import { ApiPrismaModule } from '@nx-demo/api-prisma';
import { ApiBrowseModule } from '@nx-demo/api-browse';
import { ApiSearchModule } from '@nx-demo/api-search';

@Module({
  imports: [
    ApiPrismaModule,
    ApiBrowseModule,
    ApiSearchModule,
  ],
})
export class ApiShellModule { }

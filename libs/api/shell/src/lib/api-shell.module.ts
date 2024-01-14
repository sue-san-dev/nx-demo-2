import { Module } from '@nestjs/common';
import { ApiPrismaModule } from '@nx-demo/api-prisma';
import { ApiBrowseModule } from '@nx-demo/api-browse';
import { ApiSearchModule } from '@nx-demo/api-search';
import { ApiWatchModule } from '@nx-demo/api-watch';

@Module({
  imports: [
    ApiPrismaModule,
    ApiBrowseModule,
    ApiSearchModule,
    ApiWatchModule,
  ],
})
export class ApiShellModule { }

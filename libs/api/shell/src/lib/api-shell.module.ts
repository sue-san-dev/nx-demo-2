import { Module } from '@nestjs/common';
import { ApiPrismaModule } from '@nx-demo/api-prisma';
import { ApiBrowseModule } from '@nx-demo/api-browse';
import { ApiSearchModule } from '@nx-demo/api-search';
import { ApiWatchModule } from '@nx-demo/api-watch';
import { ApiAuthModule } from '@nx-demo/api-auth';
import { ApiFileUploadModule } from '@nx-demo/api-file-upload';

@Module({
  imports: [
    ApiPrismaModule,
    ApiAuthModule,
    ApiBrowseModule,
    ApiSearchModule,
    ApiWatchModule,
    ApiFileUploadModule,
  ],
})
export class ApiShellModule { }

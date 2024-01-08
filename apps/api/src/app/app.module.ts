import { Module } from '@nestjs/common';
import { ApiShellModule } from '@nx-demo/api-shell';

@Module({
  imports: [
    ApiShellModule,
  ],
  providers: [
  ],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { ShellModule } from '@nx-demo/shell';

@Module({
  imports: [
    ShellModule,
  ],
  providers: [
  ],
})
export class AppModule { }

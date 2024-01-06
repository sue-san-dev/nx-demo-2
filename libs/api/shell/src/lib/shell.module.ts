import { Module } from '@nestjs/common';
import { PrismaModule } from '@nx-demo/prisma';
import { UserModule } from '@nx-demo/user';

@Module({
  imports: [
    PrismaModule,
    UserModule,
  ],
})
export class ShellModule { }

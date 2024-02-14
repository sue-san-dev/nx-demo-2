import { Injectable } from '@nestjs/common';
import { ApiPrismaService } from '@nx-demo/api-prisma';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ApiAuthService {

  constructor(
    private apiPrismaService: ApiPrismaService,
  ) { }

  getUserByEmail(email: string) {
    return this.apiPrismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  validateUser(user: User, password: string) {
    return bcrypt.compare(user.password, password);
  }

  getAccessToken(user: User) {
    
  }
}

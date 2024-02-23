import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport'
import { IS_AUTH_REQUIRED_KEY } from '@nx-demo/api-shared-decorators';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  override async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      return await super.canActivate(context) as boolean;
    } catch {
      // 認証必須routeの場合は例外を投げる
      const isAuthRequired = this.reflector.getAllAndOverride<boolean>(IS_AUTH_REQUIRED_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (isAuthRequired) {
        throw new UnauthorizedException();
      } else {
        return true;
      }
    }
  }
}
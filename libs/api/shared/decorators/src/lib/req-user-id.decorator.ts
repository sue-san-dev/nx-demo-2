import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { IUser } from '@nx-demo/shared-domain';

export const ReqUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): number | null => {
    const request = ctx.switchToHttp().getRequest();
    return (request.user as IUser)?.id ?? null;
  }
);

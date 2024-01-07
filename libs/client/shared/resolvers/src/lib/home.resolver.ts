import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserService } from '@nx-demo/services';
import { UrlUtil } from '@nx-demo/utils';
import { User } from '@prisma/client';
import { map } from 'rxjs';

export interface IHomeData {
  user: User;
}

export const homeResolver: ResolveFn<IHomeData> = (route) => {
  const userService = inject(UserService);
  return userService.getUser(+route.paramMap.get(UrlUtil.UserId)!).pipe(
    map(user => {
      return {
        user,
      }
    })
  );
}

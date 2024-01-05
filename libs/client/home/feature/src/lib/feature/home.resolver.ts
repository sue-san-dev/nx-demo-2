import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { UserService } from '@nx-demo/services';
import { User } from '@prisma/client';
import { map } from 'rxjs';

export interface IHomeData {
  user: User;
}

export const homeResolver: ResolveFn<IHomeData> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const userService = inject(UserService);
  return userService.getUser(+route.paramMap.get('id')!).pipe(
    map(user => {
      return {
        user,
      }
    })
  )
}
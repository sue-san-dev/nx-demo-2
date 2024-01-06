import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UrlUtil } from '@nx-demo/utils';

@Controller({ path: UrlUtil.Users })
export class UserController {
  constructor(private userService: UserService) { }

  @Get(`:${ UrlUtil.UserId }`)
  async getOne(@Param(UrlUtil.UserId, ParseIntPipe) userId: number) {
    return this.userService.getOne(userId);
  }
}

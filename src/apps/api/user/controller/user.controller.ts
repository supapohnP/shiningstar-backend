import {
  Controller,
  Get,
  Request,
} from '@nestjs/common';

import { UserService } from 'src/libs/service/user/user.service';
import { Role } from 'src/libs/constant/user.constant';
import { Auth } from 'src/libs/service/auth/decorators/auth.decorator';
import { RequestWithUser } from 'src/libs/service/auth/strategy/jwt.strategy';
import { ERROR_CODE } from 'src/libs/constant/error.constant';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
  ) { }

  @Get('/me')
  @Auth(Role.user)
  async getUserMe(
    @Request() req: RequestWithUser,
  ): Promise<any> {
    const users = await this.userService.getUserMe(req.user._id);
    if (!users) {
      return ERROR_CODE.USER_NOT_FOUND;
    }
    return { success: true, users };
  }
}

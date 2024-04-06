import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { Query as ExpressQuery } from 'express-serve-static-core';
import { UserService } from 'src/libs/service/user/user.service';
import { Role } from 'src/libs/constant/user.constant';
import { Auth } from 'src/libs/service/auth/decorators/auth.decorator';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
  ) { }

  @Get()
  @Auth(Role.admin)
  async getAllUsers(
    @Query() query: ExpressQuery
  ): Promise<any> {
    const users = await this.userService.findAll(query);
    if (!users) {
      throw new HttpException(
        'USERS_NOT_FOUND',
        HttpStatus.NOT_FOUND,
      );
    }

    return { success: true, users };
  }
}

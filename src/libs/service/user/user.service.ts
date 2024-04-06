import {
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Query } from 'express-serve-static-core';
import { User } from 'src/libs/database/user/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) { }

  async findAll(query: Query): Promise<User[]> {
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
        title: {
          $regex: query.keyword,
          $options: 'i',
        },
      }
      : {};

    const users = await this.userModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return users;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel
      .findOne({
        email: email,
      });
    return user;
  }

}

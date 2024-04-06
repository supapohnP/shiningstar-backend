import {
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { User } from 'src/libs/database/user/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) { }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel
      .findOne({
        email: email,
      });
    return user;
  }

  async getUserMe(userId: string): Promise<User> {
    const user = await this.userModel
      .findOne({
        _id: userId,
      });
    return user;
  }
}

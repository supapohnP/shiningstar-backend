import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../database/user/user.schema';
import { ERROR_CODE } from 'src/libs/constant/error.constant';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) { }

  async register(email: string, password: string) {
    const existingUser = this.userModel.findOne({
      email: email,
    });
    if (existingUser) {
      // throw new BadRequestException('Email already exists');
      return ERROR_CODE.DUPLICATE_EMAIL;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      email,
      password: hashedPassword,
    });
    const token = this.jwtService.sign({ id: user._id });
    const userRegister = await this.userModel.findOneAndUpdate(
      { email: email },
      { access_token: token },
    );
    return { success: true, user: userRegister };
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const token = this.jwtService.sign({ id: user._id });
    const userLogin = await this.userModel.findOneAndUpdate(
      { email: email },
      { access_token: token },
      { new: true },
    );
    return { success: true, user: userLogin };
  }
}

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
    console.log('check existingUser', existingUser);
    // if (existingUser) {
    //   // throw new BadRequestException('Email already exists');
    //   return ERROR_CODE.REGISTER_FAILED;
    // }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      email,
      password: hashedPassword,
    });
    const token = this.jwtService.sign({ id: user._id });
    console.log('check token', token)
    const userRegister = await this.userModel.findOneAndUpdate(
      { email: email },
      { access_token: token },
    );
    return { success: true, user: userRegister };
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    console.log('check user', user)
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
    );
    return { success: true, user: userLogin };
  }

  // async validateUser(email: string, password: string): Promise<User> {
  //   const user: User = await this.userModel.findOne({
  //     email: email,
  //   });
  //   if (!user) {
  //     throw new BadRequestException('User not found');
  //   }
  //   const isMatch: boolean = bcrypt.compareSync(password, user.password);
  //   if (!isMatch) {
  //     throw new BadRequestException('Password does not match');
  //   }
  //   return user;
  // }

  // async login(user: { email: string, password: string }): Promise<AccessToken> {
  //   const payload = { email: user.email };
  //   return { access_token: this.jwtService.sign(payload) };
  // }

  // async register(user: RegisterRequestDto): Promise<AccessToken> {
  //   const existingUser = this.userModel.findOne({
  //     email: user.email,
  //   });
  //   if (existingUser) {
  //     throw new BadRequestException('email already exists');
  //   }
  //   const hashedPassword = await bcrypt.hash(user.password, 10);
  //   const newUser = { ...user, password: hashedPassword };
  //   await this.userModel.create(newUser);
  //   return this.login(newUser);
  // }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/libs/database/user/user.schema';
import { UserController } from './controller/user.controller';
import { AuthModule } from '../auth/auth.module';
import { UserService } from 'src/libs/service/user/user.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [
    UserController,
  ],
  providers: [
    UserService,
  ],
  exports: [
  ],
})
export class UserModule { }

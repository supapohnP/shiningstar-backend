import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/libs/constant/user.constant';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'users',
})
export class User extends Document {
  @Prop({
    type: String,
  })
  name?: string;

  @Prop({
    type: String,
    // unique: [true, 'Duplicate email entered'],
    // unique: true,
  })
  email: string;

  @Prop({
    type: String,
    select: false,
  })
  password: string;

  @Prop({
    type: String,
    select: false,
  })
  access_token?: string;

  @Prop({
    type: String,
  })
  role?: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = User & Document;

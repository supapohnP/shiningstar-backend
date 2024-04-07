import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../user/user.schema';
import { SeatStatus } from 'src/libs/constant/seat.constant';
import { EventListing } from '../event-listing/event-listing.schema';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'seats',
})
export class Seat extends Document {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
  })
  user_id: User | string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: EventListing.name,
  })
  event_id: EventListing | string;

  @Prop({
    type: String,
  })
  zone: string;

  @Prop({
    type: String,
  })
  row: string;

  @Prop({
    type: Number,
  })
  seat_number: number;

  @Prop({
    type: String,
  })
  seat_status: SeatStatus;
}

export const SeatSchema = SchemaFactory.createForClass(Seat);

export type SeatDocument = Seat & Document;

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../user/user.schema';
import { EventListing } from '../event-listing/event-listing.schema';
import { Seat } from '../seat/seat.schema';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'reservations',
})
export class Reservation extends Document {
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
    type: MongooseSchema.Types.ObjectId,
    ref: Seat.name,
  })
  seat_id: Seat | string;

  @Prop({
    type: String,
  })
  status: string;

  @Prop({
    type: Date,
  })
  reserved_at: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);

export type ReservationDocument = Reservation & Document;

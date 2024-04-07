import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EventStatus, EventType } from 'src/libs/constant/event-listing.constant';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'event-listings',
})
export class EventListing extends Document {
  @Prop({
    type: String,
  })
  name: string;

  @Prop({
    type: String,
  })
  description: string;

  @Prop({
    type: String,
  })
  type: EventType;

  @Prop({
    type: String,
  })
  status: EventStatus;

  @Prop({
    type: Date,
  })
  ticket_sale_at: Date;

  @Prop({
    type: Date,
  })
  event_at: Date;

  @Prop({
    type: Number,
  })
  total_seat: number;
}

export const EventListingSchema = SchemaFactory.createForClass(EventListing);

export type EventListingDocument = EventListing & Document;

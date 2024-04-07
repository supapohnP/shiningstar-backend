import {
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { EventListing } from 'src/libs/database/event-listing/event-listing.schema';
import { CreateEventListingDTO } from 'src/libs/dto/event-listing.dto';

@Injectable()
export class EventListingService {
  constructor(
    @InjectModel(EventListing.name)
    private eventListingModel: mongoose.Model<EventListing>,
  ) { }

  async getAllEventListings(): Promise<EventListing[]> {
    const eventListings = await this.eventListingModel.find({});
    return eventListings;
  }

  async getEventListingById(eventId: string): Promise<EventListing | any> {
    const eventListings = await this.eventListingModel.find({ _id: eventId });
    return eventListings;
  }

  async createEventListing(body: CreateEventListingDTO): Promise<EventListing | any> {
    const eventListings = await this.eventListingModel.create(
      { ...body },
    );
    return eventListings;
  }

  async editEventListingById(eventId: string, body: any): Promise<EventListing | any> {
    const eventListings = await this.eventListingModel.findOneAndUpdate(
      { _id: eventId },
      { ...body },
      { new: true },
    );
    return eventListings;
  }

  async deleteEventListingById(eventId: string): Promise<EventListing | any> {
    const eventListings = await this.eventListingModel.findOneAndDelete(
      { _id: eventId },
    );
    return eventListings;
  }

}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { EventListingController } from './controller/event-listing.controller';
import { EventListingService } from 'src/libs/service/event-listing/event-listing.service';
import { EventListingSchema } from 'src/libs/database/event-listing/event-listing.schema';
import { RedisService } from 'src/libs/service/redis/redis.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'EventListing', schema: EventListingSchema }]),
  ],
  controllers: [
    EventListingController,
  ],
  providers: [
    EventListingService,
    RedisService,
  ],
  exports: [
  ],
})
export class EventListingModule { }

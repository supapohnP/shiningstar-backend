import {
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ERROR_CODE } from 'src/libs/constant/error.constant';

import { Role } from 'src/libs/constant/user.constant';
import { CreateEventListingDTO, EditEventListingDTO } from 'src/libs/dto/event-listing.dto';
import { Auth } from 'src/libs/service/auth/decorators/auth.decorator';
import { EventListingService } from 'src/libs/service/event-listing/event-listing.service';
import { RedisService } from 'src/libs/service/redis/redis.service';
import { createEventListingValidationBody, editEventListingValidationBody } from 'src/libs/validation/event-listing.validation';
import { JoiValidationPipe } from 'src/libs/validation/joi.validation.pipe';

@Controller('event-listings')
export class EventListingController {
  constructor(
    private eventListingService: EventListingService,
    private redisService: RedisService,
  ) { }

  @Post()
  @Auth(Role.admin)
  async createEventListing(
    @Body(new JoiValidationPipe(createEventListingValidationBody))
    body: CreateEventListingDTO
  ): Promise<any> {
    const eventListing = await this.eventListingService.createEventListing(body);
    if (!eventListing) {
      return ERROR_CODE.EVENT_LISTING_CAN_NOT_CREATE;
    }
    return { success: true, event_listing: eventListing };
  }

  @UseInterceptors(CacheInterceptor)
  @Get()
  @Auth(Role.admin, Role.user)
  async getAllEventListings(
  ): Promise<any> {
    let eventListings = [];

    const cacheKey = 'cache-key:getAllEventListings';
    const ttl = 60 * 60; // caching 1 hour
    const cachedData = await this.redisService.getCache(
      cacheKey,
    );
    if (cachedData) {
      eventListings = JSON.parse(cachedData as string);
    } else {
      eventListings = await this.eventListingService.getAllEventListings();
      if (!eventListings) {
        return ERROR_CODE.EVENT_LISTING_NOT_FOUND;
      }
      await this.redisService.saveCache(cacheKey, eventListings, ttl);
    }

    return { success: true, event_listings: eventListings };
  }

  @UseInterceptors(CacheInterceptor)
  @Get('/:id')
  @Auth(Role.admin, Role.user)
  async getEventListingsById(
    @Param('id') id: string,
  ): Promise<any> {
    let eventListing;

    const cacheKey = `cache-key:getEventListingsById=${id}`;
    const durationSecs = 60; // caching 1 minute
    const cachedData = await this.redisService.getCache(
      cacheKey,
    );
    if (cachedData) {
      eventListing = JSON.parse(cachedData as string);
    } else {
      eventListing = await this.eventListingService.getEventListingById(id);
      if (!eventListing) {
        return ERROR_CODE.EVENT_LISTING_NOT_FOUND;
      }
      await this.redisService.saveCache(cacheKey, eventListing, durationSecs)
    }

    return { success: true, event_listing: eventListing };
  }

  @Put('/:id')
  @Auth(Role.admin)
  async editEventListingById(
    @Param('id') id: string,
    @Body(new JoiValidationPipe(editEventListingValidationBody))
    body: EditEventListingDTO
  ): Promise<any> {
    const eventListing = await this.eventListingService.editEventListingById(id, body);
    if (!eventListing) {
      return ERROR_CODE.EVENT_LISTING_CAN_NOT_UPDATE;
    }
    return { success: true, event_listing: eventListing };
  }

  @Delete('/:id')
  @Auth(Role.admin)
  async deleteEventListingById(
    @Param('id') id: string,
  ): Promise<any> {
    const eventListing = await this.eventListingService.deleteEventListingById(id);
    if (!eventListing) {
      return ERROR_CODE.EVENT_LISTING_NOT_FOUND;
    }
    return { success: true };
  }
}

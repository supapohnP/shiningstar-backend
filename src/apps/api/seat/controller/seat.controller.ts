import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ERROR_CODE } from 'src/libs/constant/error.constant';
import { SeatStatus } from 'src/libs/constant/seat.constant';
import { Role } from 'src/libs/constant/user.constant';
import { CreateSeatDTO, SeatDTO } from 'src/libs/dto/seat.dto';

import { Auth } from 'src/libs/service/auth/decorators/auth.decorator';
import { SeatService } from 'src/libs/service/seat/seat.service';
import { JoiValidationPipe } from 'src/libs/validation/joi.validation.pipe';
import { createSeatValidationBody, editSeatValidationBody } from 'src/libs/validation/seat.validation';

@Controller('seats')
export class SeatController {
  constructor(
    private seatService: SeatService,
  ) { }

  @Post()
  @Auth(Role.admin)
  async createSeats(
    @Body(new JoiValidationPipe(createSeatValidationBody))
    body: CreateSeatDTO
  ): Promise<any> {
    // Generate seats
    const { zone, num_rows, seat_per_row, event_id } = body
    const listSeats = [];
    for (let row = 1; row <= num_rows; row++) {
      for (let seatNumber = 1; seatNumber <= seat_per_row; seatNumber++) {
        listSeats.push({
          zone,
          row,
          seat_number: seatNumber,
          seat_status: SeatStatus.available,
          event_id,
        });
      }
    }
    // Create seats
    const seats = await this.seatService.createSeats(listSeats);
    if (!seats) {
      return ERROR_CODE.SEAT_CAN_NOT_CREATE;
    }
    return { success: true, listSeats };
  }

  @Get()
  @Auth(Role.admin, Role.user)
  async getAllSeats(
  ): Promise<any> {
    const seats = await this.seatService.getAllSeats();
    if (!seats) {
      return ERROR_CODE.SEAT_NOT_FOUND;
    }
    return { success: true, seats: seats };
  }

  @Get('/:id')
  @Auth(Role.admin, Role.user)
  async getSeatById(
    @Param('id') id: string,
  ): Promise<any> {
    const seat = await this.seatService.getSeatAvailableById(id);
    if (!seat) {
      return ERROR_CODE.SEAT_NOT_FOUND;
    }
    return { success: true, seat };
  }

  @Put('/:id')
  @Auth(Role.admin)
  async editSeatById(
    @Param('id') id: string,
    @Body(new JoiValidationPipe(editSeatValidationBody))
    body: SeatDTO
  ): Promise<any> {
    const seat = await this.seatService.editSeatById(id, body);
    if (!seat) {
      return ERROR_CODE.SEAT_CAN_NOT_UPDATE;
    }
    return { success: true, seat };
  }

  @Delete('/:id')
  @Auth(Role.admin)
  async deleteSeatById(
    @Param('id') id: string,
  ): Promise<any> {
    const seat = await this.seatService.deleteSeatById(id);
    if (!seat) {
      return ERROR_CODE.SEAT_CAN_NOT_UPDATE;
    }
    return { success: true };
  }
}

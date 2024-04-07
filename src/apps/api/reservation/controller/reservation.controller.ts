import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { ERROR_CODE } from 'src/libs/constant/error.constant';
import { Role } from 'src/libs/constant/user.constant';
import { ReservationRequestBodyDTO } from 'src/libs/dto/reservation.dto';
import { Auth } from 'src/libs/service/auth/decorators/auth.decorator';
import { RequestWithUser } from 'src/libs/service/auth/strategy/jwt.strategy';
import { ReservationService } from 'src/libs/service/reservation/reservation.service';
import { SeatService } from 'src/libs/service/seat/seat.service';
import { JoiValidationPipe } from 'src/libs/validation/joi.validation.pipe';
import { createReservationValidationBody } from 'src/libs/validation/reservation.validation';

@Controller('reservations')
export class ReservationController {
  constructor(
    private reservationService: ReservationService,
    private seatService: SeatService,
  ) { }

  @Post()
  @Auth(Role.user)
  async createReservation(
    @Request() req: RequestWithUser,
    @Body(new JoiValidationPipe(createReservationValidationBody))
    body: ReservationRequestBodyDTO
  ): Promise<any> {
    const isSeatAvailable = await this.seatService.getSeatAvailableById(body.seat_id)
    if (!isSeatAvailable) {
      return ERROR_CODE.SEAT_NOT_AVAILABLE;
    }
    const reservation = await this.reservationService.createReservation(
      req.user._id,
      body,
    );
    if (!reservation) {
      return ERROR_CODE.RESERVATION_CAN_NOT_CREATE;
    }
    return { success: true, reservation };
  }

  @Post('confirm/:reservationId')
  @Auth(Role.user)
  async confirmReservation(
    @Request() req: RequestWithUser,
    @Param('reservationId') reservationId: string,
  ): Promise<any> {
    const reservationConfirm = await this.reservationService.confirmReservationById(
      req.user._id,
      reservationId,
    );
    if (!reservationConfirm) {
      return ERROR_CODE.RESERVATION_CAN_NOT_UPDATE;
    }
    return { success: true, reservation: reservationConfirm };
  }

  @Get('history')
  @Auth(Role.user)
  async getReservationHistory(
    @Request() req: RequestWithUser,
  ): Promise<any> {
    const reservationHistory = await this.reservationService.getReservationByUserId(req.user._id);
    if (!reservationHistory) {
      return ERROR_CODE.RESERVATION_NOT_FOUND;
    }
    return { success: true, reservation: reservationHistory };
  }
}

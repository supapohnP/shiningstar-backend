import {
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment-timezone';
import * as mongoose from 'mongoose';
import { ReservationStatus } from 'src/libs/constant/reservation.constant';
import { Reservation } from 'src/libs/database/reservation/reservation.schema';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: mongoose.Model<Reservation>,
  ) { }

  async getReservationByUserId(userId: string): Promise<Reservation | any> {
    const reservations = await this.reservationModel
      .find({
        user_id: userId,
        status: ReservationStatus.successful,
      });
    return reservations;
  }

  async createReservation(userId: string, reservationData: any): Promise<Reservation | any> {
    const reservations = await this.reservationModel
      .create({
        user_id: userId,
        ...reservationData,
      });
    return reservations;
  }

  async confirmReservationById(userId: string, reservationId: string): Promise<Reservation | any> {
    const reservations = await this.reservationModel.findByIdAndUpdate(
      {
        _id: reservationId,
        user_id: userId,
      },
      {
        reserved_at: moment().toDate(),
        status: ReservationStatus.successful,
      },
      { new: true, },
    );
    return reservations;
  }

}

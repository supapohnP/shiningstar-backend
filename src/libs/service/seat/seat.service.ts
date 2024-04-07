import {
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { SeatStatus } from 'src/libs/constant/seat.constant';
import { Seat, SeatDocument } from 'src/libs/database/seat/seat.schema';
import { SeatDTO } from 'src/libs/dto/seat.dto';

@Injectable()
export class SeatService {
  constructor(
    @InjectModel(Seat.name)
    private seatModel: mongoose.Model<Seat>,
  ) { }

  async getAllSeats(): Promise<Seat[]> {
    const seats = await this.seatModel.find({});
    return seats;
  }

  async getSeatAvailableById(seatId: string): Promise<Seat | any> {
    const seat = await this.seatModel
      .find({
        _id: seatId,
        seat_status: SeatStatus.available,
      });
    return seat;
  }

  async createSeats(dataToCreate: SeatDocument[]) {
    const seats = await this.seatModel.insertMany(dataToCreate);
    return seats;
  }

  async editSeatById(seatId: string, body: SeatDTO): Promise<Seat | any> {
    const seat = await this.seatModel.findOneAndUpdate(
      { _id: seatId },
      { ...body },
      { new: true },
    );
    return seat;
  }

  async deleteSeatById(seatId: string): Promise<Seat | any> {
    const seat = await this.seatModel.findOneAndDelete(
      { _id: seatId },
    );
    return seat;
  }

}

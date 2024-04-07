import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { SeatSchema } from 'src/libs/database/seat/seat.schema';
import { ReservationService } from 'src/libs/service/reservation/reservation.service';
import { ReservationController } from './controller/reservation.controller';
import { SeatModule } from '../seat/seat.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Reservation', schema: SeatSchema }]),
    SeatModule,
  ],
  controllers: [
    ReservationController,
  ],
  providers: [
    ReservationService,
  ],
  exports: [
  ],
})
export class ReservationModule { }

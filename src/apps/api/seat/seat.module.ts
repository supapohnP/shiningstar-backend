import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { SeatSchema } from 'src/libs/database/seat/seat.schema';
import { SeatService } from 'src/libs/service/seat/seat.service';
import { SeatController } from './controller/seat.controller';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Seat', schema: SeatSchema }]),
  ],
  controllers: [
    SeatController,
  ],
  providers: [
    SeatService,
  ],
  exports: [
    SeatService,
  ],
})
export class SeatModule { }

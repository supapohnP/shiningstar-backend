import { SeatStatus } from "../constant/seat.constant";

export class SeatDTO {
  user_id: string;
  zone: string;
  row: string;
  seat_number: number;
  seat_status: SeatStatus;
}

export class CreateSeatDTO {
  zone: string;
  num_rows: number;
  seat_per_row: number;
  event_id: string;
}

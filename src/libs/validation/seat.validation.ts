import * as Joi from 'joi';
import { SeatStatus } from '../constant/seat.constant';

export const createSeatValidationBody = Joi.object().keys({
  zone: Joi.string(),
  num_rows: Joi.number(),
  seat_per_row: Joi.number(),
  event_id: Joi.string(),
});

export const editSeatValidationBody = Joi.object().keys({
  user_id: Joi.string().optional(),
  zone: Joi.string().optional(),
  row: Joi.string().optional(),
  seat_number: Joi.number().optional(),
  seat_status: Joi.string().valid(...Object.values(SeatStatus)).optional(),
});

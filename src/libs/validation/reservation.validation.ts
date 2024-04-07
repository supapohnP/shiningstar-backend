import * as Joi from "joi";

export const createReservationValidationBody = Joi.object().keys({
  seat_id: Joi.string().required(),
  event_id: Joi.string(),
  user_id: Joi.string().required(),
});

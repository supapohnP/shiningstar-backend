import * as Joi from 'joi';

export const createEventListingValidationBody = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  type: Joi.string().optional(),
  ticket_sale_at: Joi.date().optional(),
  event_at: Joi.date().required(),
  total_seat: Joi.number().optional(),
});

export const editEventListingValidationBody = Joi.object().keys({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  type: Joi.string().optional(),
  ticket_sale_at: Joi.date().optional(),
  event_at: Joi.date().optional(),
  total_seat: Joi.number().optional(),
});

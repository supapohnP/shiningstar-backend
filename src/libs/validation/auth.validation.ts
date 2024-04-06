import * as Joi from 'joi';

export const loginValidationBody = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const registerValidationBody = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().optional(),
});
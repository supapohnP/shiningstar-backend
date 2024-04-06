import Joi from 'joi';

export interface ErrorResponse {
  success: false;
  error_code: number;
  error_message?: string;
  validation_error?: Joi.ValidationErrorItem[];
}
export type APIResponse<Custom = { [key: string]: any }> =
  | ({
    success: true;
  } & Custom)
  | ErrorResponse;

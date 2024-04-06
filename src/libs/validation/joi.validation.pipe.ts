import { HttpException, HttpStatus, PipeTransform } from "@nestjs/common";
import { ObjectSchema, StringSchema } from "joi";

export class JoiValidationPipe implements PipeTransform {
  constructor(
    private schema: ObjectSchema | StringSchema,
  ) { }

  transform(toBeValidateValue: any) {
    const { error, value } = this.schema.validate(
      toBeValidateValue,
      {
        // abortEarly is the option that the validation will abort instantly when found any error / In Development set to false for whole body validation to see every error that happen to the body
      },
    );
    if (error) {
      console.error({ error });
      throw new HttpException(
        'REQUEST_BODY_VALIDATION_FAILED',
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}
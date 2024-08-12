// src/utils.common/utils.validator.common/alphabetic.validator.ts

import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from "class-validator";

@ValidatorConstraint({ async: false })
export class AlphabeticValidator implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    // Biểu thức chính quy để kiểm tra chuỗi chỉ chứa các ký tự được chỉ định
    return /^[a-zA-Z0-9\sÀ-ỹ]+$/.test(text);
  }

  defaultMessage(args: ValidationArguments) {
    return "Chuỗi ($value) chỉ được chứa các ký tự chữ cái, số, dấu cách và các ký tự tiếng Việt";
  }
}

export function IsAlphabetic(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: AlphabeticValidator,
    });
  };
}

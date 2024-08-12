import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from "class-validator";

@ValidatorConstraint({ name: "isUrlIfNotEmpty", async: false })
export class IsUrlIfNotEmptyConstraint implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    if (text === "") {
      return true; // If the string is empty, skip URL validation
    }
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(text); // Perform URL validation
  }

  defaultMessage(args: ValidationArguments) {
    return "Avatar must be a valid URL if provided";
  }
}

export function IsUrlIfNotEmpty(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUrlIfNotEmptyConstraint,
    });
  };
}

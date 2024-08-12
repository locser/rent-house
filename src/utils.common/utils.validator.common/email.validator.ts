import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";

@ValidatorConstraint({ async: false })
class IsCustomEmailConstraint implements ValidatorConstraintInterface {
  validate(email: any, args: ValidationArguments) {
    const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const localPart = email.split("@")[0];
    const domainPart = email.split("@")[1];

    if (email.length < 5 || email.length > 320) {
      return false;
    }

    if (!emailRegex.test(email)) {
      return false;
    }

    if (
      localPart.startsWith(" ") ||
      localPart.endsWith(".") ||
      localPart.includes("..")
    ) {
      return false;
    }

    if (!domainPart || domainPart.split(".").some((part) => part.length < 2)) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return "Email không hợp lệ";
  }
}

export function IsCustomEmail(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCustomEmailConstraint,
    });
  };
}

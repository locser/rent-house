import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({async: false})
export class IdentificationNumberValidator
    implements ValidatorConstraintInterface {
    validate(cccdNumber: string, args: ValidationArguments) {
        if (cccdNumber && cccdNumber !== "") {
            // Kiểm tra độ dài của CCCD
            if (cccdNumber.length !== 9 && cccdNumber.length !== 12) {
                return false;
            }

            // Kiểm tra CCCD chỉ chứa các ký tự số
            if (!/^\d+$/.test(cccdNumber)) {
                return false;
            }
        }

        return true;
    }

    defaultMessage(args: ValidationArguments) {
        return "Số CCCD không hợp lệ";
    }
}

export function IsIdentificationNumber(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IdentificationNumberValidator,
        });
    };
}

import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({async: false})
export class TaxNumberValidator implements ValidatorConstraintInterface {
    validate(taxNumber: string, args: ValidationArguments) {
        if (taxNumber !== "") {
            // Kiểm tra độ dài của MST
            if (taxNumber.length !== 10) {
                return false;
            }

            // Kiểm tra MST chỉ chứa các ký tự số
            if (!/^\d{10}$/.test(taxNumber)) {
                return false;
            }

            // Kiểm tra quy tắc checksum cho MST theo chuẩn Việt Nam (ví dụ: không có quy tắc checksum thực tế, chỉ là ví dụ)
            // Các quy tắc này có thể thay đổi tùy theo yêu cầu thực tế của MST Việt Nam
            // Ví dụ đơn giản: tổng các chữ số phải chia hết cho một số cụ thể nào đó

            // const digits = taxNumber.split("").map(Number);
            // const checksum =
            //   (digits[0] * 8 +
            //     digits[1] * 7 +
            //     digits[2] * 6 +
            //     digits[3] * 5 +
            //     digits[4] * 4 +
            //     digits[5] * 3 +
            //     digits[6] * 2 +
            //     digits[7] * 1 +
            //     digits[8] * 9 +
            //     digits[9] * 8) %
            //   11;

            // if (checksum !== 0) {
            //   return false;
            // }
        }

        return true;
    }

    defaultMessage(args: ValidationArguments) {
        return "Mã số thuế không hợp lệ";
    }
}

export function IsTaxNumber(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: TaxNumberValidator,
        });
    };
}

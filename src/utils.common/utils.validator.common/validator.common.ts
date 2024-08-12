import { validate } from "class-validator";

/**
 * A static class to validate DTOs using class-validator.
 */
export class ValidateDTO {
  /**
   * Validates a given DTO with provided data.
   *
   * @param DTO - The class of the DTO to validate.
   * @param data - The data to validate against the DTO.
   * @returns An object with a status indicating success or failure, and a message describing the result.
   *
   * @example
   * ```typescript
   * import { IsString } from 'class-validator';
   *
   * class MyDTO {
   *   @IsString()
   *   myProperty: string;
   * }
   *
   * const myData = { myProperty: 'hello' };
   * const validationResult = await ValidateDTO.validate(MyDTO, myData);
   * console.log(validationResult); // { status: true, message: 'Success' }
   * ```
   */
  static async validate(DTO: any, data: any) {
    const validationErrors = await validate(Object.assign(new DTO(), data));

    if (validationErrors.length > 0) {
      return {
        status: false,
        message: Object.values(validationErrors[0].constraints)[0],
      };
    } else {
      return {
        status: true,
        message: "Success",
      };
    }
  }
}

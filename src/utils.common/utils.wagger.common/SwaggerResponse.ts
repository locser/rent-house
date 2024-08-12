import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class SwaggerResponse<T> {
  @ApiProperty({ default: HttpStatus.OK })
  status: number;

  @ApiProperty()
  message: string;

  data: T[];
}

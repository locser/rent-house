import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class SwaggerBaseListResponse<T> {
  @ApiProperty({
    type: "array",
    items: {
      type: "object",
    },
    description: "Danh sách bản ghi",
    required: true,
  })
  list: T[];

  @ApiProperty({
    type: "number",
    description: "limit",
  })
  limit: number;

  @ApiProperty({
    type: "number",
    description: "Tổng số bản ghi",
    required: true,
  })
  total_record: number;
}

export class SwaggerBaseResponse<T> {
  @ApiProperty({ default: HttpStatus.OK })
  status: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: SwaggerBaseListResponse<T>;
}

import { ApiProperty } from '@nestjs/swagger';

export class BodyBookingDto {
  @ApiProperty({
    type: String,
    example: '2022-05-15',
  })
  booking_date: string;

  @ApiProperty({
    type: String,
    example: 'hello world',
  })
  note: string;
  @ApiProperty({
    type: String,
    example: 'hello world',
  })
  booking_detail;
  @ApiProperty({
    type: Number,
    example: 1,
  })
  status: number;
}

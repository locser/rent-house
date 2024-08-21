import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({
    description: 'The customer id of the booking',
    example: 123,

    type: 'number',
  })
  customerId: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, Length, IsInt } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({
    description: 'Description of the service',
    type: 'string',
    example: 'Wifi',
  })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty()
  @Length(1, 255, { message: 'Name must be between 1 and 255 characters' })
  description: string;

  @IsInt()
  @Type(() => Number)
  @ApiProperty({
    description: 'Price of the service',
    type: 'number',
    example: 100000,
  })
  price: number;

  @IsInt()
  @Type(() => Number)
  @ApiProperty({
    description: 'thanh toán 1 lần hay hàng tháng, chưa có enum ',
    type: 'number',
    example: 1,
  })
  type: number;
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty()
  @Length(1, 255, { message: 'Name must be between 1 and 255 characters' })
  @ApiProperty({
    description: 'Description of the service',
    type: 'string',
    example: 'Wifi',
  })
  name: string;
}

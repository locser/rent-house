import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, Min } from 'class-validator';

export class CreateWishlistDto {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Unique identifier for the home',
  })
  @Min(1)
  @Type(() => Number)
  @IsNotEmpty()
  home_id: number;
}

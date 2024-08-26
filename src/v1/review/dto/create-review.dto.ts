import { IsString, IsNumber, IsNotEmpty, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDTO {
  @ApiProperty({
    description: 'The content of the review',
    example: 'Great place to stay!',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'The rating given to the home',
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    description: 'The ID of the home being reviewed',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  home_id: number;
}

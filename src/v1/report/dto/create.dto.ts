import { IsString, IsNumber, IsNotEmpty, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDTO {
  @ApiProperty({
    description: 'The content of the review',
    example: 'Great place to stay!',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'The ID of the home being reviewed',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  home_id: number;
}

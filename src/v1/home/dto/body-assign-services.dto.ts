import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class BodyAssignServicesDto {
  //validate all each is number and not empty
  @ApiProperty({ type: [Number], example: [1, 2, 3] })
  @IsNumber({}, { each: true })
  @IsArray({ each: true })
  @IsNotEmpty()
  service_ids: number[];

  // home id
  @ApiProperty({ type: Number, example: 1 })
  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  home_id: number;
}

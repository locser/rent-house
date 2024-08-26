import { Type } from 'class-transformer';
import { IsNotEmpty, Min } from 'class-validator';

export class BodyUpdateStatusDto {
  @Min(0)
  @Type(() => Number)
  @IsNotEmpty()
  status: number;
}

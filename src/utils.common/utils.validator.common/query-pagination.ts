import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, Min } from 'class-validator';

export class QueryPaginationDTO {
  @ApiProperty({
    type: Number,
    description: 'Page number',
    example: 1,
  })
  @Min(0)
  @Type(() => Number)
  @IsNotEmpty()
  page: number;

  @ApiProperty({
    type: Number,
    description: 'limit number',
    example: 1,
  })
  @Min(0)
  @Type(() => Number)
  @IsNotEmpty()
  limit: number;
}

export class ParamEntityDTO {
  @ApiProperty({
    type: Number,
    description: 'id cuả đối tượng ',
    example: 1,
  })
  @Min(1)
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}

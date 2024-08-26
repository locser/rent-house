import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, Min } from 'class-validator';

export class BodyUpdateUserAddressDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the city',
  })
  @Min(1)
  @Type(() => Number)
  @IsNotEmpty()
  city_id: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the ward_id',
  })
  @Min(1)
  @Type(() => Number)
  @IsNotEmpty()
  ward_id: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the district_id',
  })
  @Min(1)
  @Type(() => Number)
  @IsNotEmpty()
  district_id: number;

  @ApiProperty({
    example: 'hẻm 123/21 Lý thường kiệt',
    description: 'thêm text địa chỉ cho chính xác',
  })
  @IsOptional()
  detail: string;
}

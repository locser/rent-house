import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    type: String,
    example: 'Nguyen Van A',
  })
  @IsNotEmpty()
  @MaxLength(30)
  full_name: string;

  @ApiProperty({
    type: String,
    description: 'email dang nhap',
    example: 'nguyenvan@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'password dang nhap',
    example: '12345678',
  })
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
    description: 'loại người dùng: 0: người mua, 1: admin, 2: người bán',
  })
  @IsEnum([0, 1, 2])
  @Type(() => Number)
  @IsNotEmpty()
  type: number;
}

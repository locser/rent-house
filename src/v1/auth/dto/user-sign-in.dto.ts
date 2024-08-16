import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Email đăng nhập',
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'password đăng nhập',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

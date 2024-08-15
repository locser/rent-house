import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Email đăng nhập',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

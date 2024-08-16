import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    type: String,
    description: 'Mật khẩu cũ',
  })
  @MinLength(8)
  @MaxLength(15)
  @IsNotEmpty()
  old_password: string;

  @ApiProperty({
    type: String,
    description: 'Mật khẩu mới',
  })
  @MinLength(8)
  @MaxLength(15)
  @IsNotEmpty()
  new_password: string;
}

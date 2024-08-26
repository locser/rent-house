import { ApiProperty } from '@nestjs/swagger';
import { UtilsTime } from 'src/utils.common/utils.time.common/utils.time.common';
import { UserEntity } from 'src/v1/shared/user.entity';

export class BaseUserResponse {
  @ApiProperty({
    example: 1,
  })
  id: number;
  @ApiProperty({
    example: 'John Doe',
  })
  full_name: string;
  @ApiProperty({
    example: 'john.doe@gmail.com',
  })
  email: string;

  @ApiProperty({
    example: '1990-01-01',
  })
  birthday: string;

  @ApiProperty({
    example: 1,
  })
  gender: number;

  @ApiProperty({
    example: '',
  })
  created_at: string;

  constructor(user: UserEntity) {
    this.id = user?.id || 0;

    this.full_name = user?.full_name || '';

    this.email = user?.email || '';

    this.birthday = user?.birthday || '';

    this.gender = user?.gender || 0;

    this.created_at = UtilsTime.formatDateTimeVNToString(user?.created_at) || '';
  }
}

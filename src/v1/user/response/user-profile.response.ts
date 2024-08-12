import { ApiProperty } from '@nestjs/swagger';
import { Role, USER_STATUS } from 'src/utils.common/utils.enum.common/utils.user.enum';

export class UserProfileResponse {
  @ApiProperty({
    type: String,
  })
  avatar: string;
  @ApiProperty({
    type: String,
  })
  full_name: string;
  @ApiProperty({
    type: String,
  })
  nick_name: string;
  @ApiProperty({
    type: String,
  })
  password: string;
  @ApiProperty({
    type: String,
  })
  address: string;
  @ApiProperty({
    type: String,
  })
  cover: string;
  @ApiProperty({
    type: String,
  })
  phone: string;
  @ApiProperty({
    type: Number,
  })
  gender: number;
  @ApiProperty({
    type: String,
  })
  birthday: string;
  @ApiProperty({
    type: String,
  })
  description: string;
  @ApiProperty({
    type: String,
  })
  email: string;
  @ApiProperty({
    type: String,
  })
  last_connect: string;
  @ApiProperty({
    type: Number,
  })
  status: number;
  @ApiProperty({
    type: String,
  })
  role: string;

  contact_type: number;

  constructor(user: any) {
    // this.id = user?.id || new Types.ObjectId();
    this.avatar = user?.avatar || '';
    this.full_name = user?.full_name || '';
    this.nick_name = user?.nick_name || '';
    this.password = user?.password || '';
    this.address = user?.address || '';
    this.cover = user?.cover || '';
    this.phone = user?.phone || '';
    this.gender = user?.gender || 0;
    this.birthday = user?.birthday || '';
    this.description = user?.description || '';
    this.email = user?.email || '';
    this.last_connect = user?.last_connect;
    this.status = user?.status || USER_STATUS.ACTIVE;
    this.role = user?.role || Role.User;
    this.contact_type = user?.contact_type || 0;
  }
}

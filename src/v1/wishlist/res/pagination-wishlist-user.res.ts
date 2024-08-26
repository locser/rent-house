import { ApiProperty } from '@nestjs/swagger';
import { UtilsTime } from 'src/utils.common/utils.time.common/utils.time.common';
import { HomeEntity } from 'src/v1/home/entities/home.entity';
import { HomeResponse } from 'src/v1/home/response/home-response.response';
import { WishlistEntity } from '../entities/wishlist.entity';

export class PaginationWishlistUserResponse {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 1,
  })
  user_id: number;

  @ApiProperty({
    example: 1,
  })
  @ApiProperty({
    example: HomeResponse,
  })
  home: HomeResponse;

  @ApiProperty({
    example: '2022-01-01 00:00',
  })
  created_at: string;

  @ApiProperty({
    example: '2022-01-01 00:00',
  })
  updated_at: string;

  constructor(data: WishlistEntity, home?: HomeEntity) {
    this.id = data?.id || 0;

    this.user_id = data?.user_id || 0;

    this.home = new HomeResponse(home);

    this.created_at = UtilsTime.formatDateTimeVNToString(data?.created_at) || '';

    this.updated_at = UtilsTime.formatDateTimeVNToString(data?.updated_at) || '';
  }
}

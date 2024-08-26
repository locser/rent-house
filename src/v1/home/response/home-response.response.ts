import { ApiProperty } from '@nestjs/swagger';
import { HomeEntity } from '../entities/home.entity';
import { UtilsTime } from 'src/utils.common/utils.time.common/utils.time.common';

export class HomeResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Beautiful House in the City Center' })
  title: string;

  @ApiProperty({ example: 'A cozy house with all amenities in the heart of the city.' })
  description: string;

  @ApiProperty({ example: 1001 })
  address_id: number;

  @ApiProperty({ example: 120 })
  area: number;

  @ApiProperty({ example: 1000 })
  deposit: number;

  @ApiProperty({ example: 5000 })
  price: number;

  @ApiProperty({ example: 4.5 })
  rating: number;

  @ApiProperty({ example: 101 })
  owner_id: number;

  @ApiProperty({ example: 1 })
  gender: number;

  @ApiProperty({ example: 4 })
  max_number_people: number;

  @ApiProperty({ example: 1 })
  status: number;

  @ApiProperty({ example: [1, 2, 3] })
  services: number[];

  @ApiProperty({ example: '10.762622' })
  latitude: string;

  @ApiProperty({ example: '106.660172' })
  longitude: string;

  @ApiProperty({ example: ['/image1.jpg', '/image2.jpg'] })
  image_url: string[];

  @ApiProperty({ example: 2000 })
  deposit_amount: number;

  @ApiProperty({ example: 30 })
  withdrawal_period: number;

  @ApiProperty({ example: 2 })
  type: number;

  @ApiProperty({ example: 100 })
  view_count: number;

  @ApiProperty({ example: '2024-08-19 10:00' })
  created_at: string;

  @ApiProperty({ example: '2024-08-19 12:00' })
  updated_at: string;

  constructor(homeEntity: HomeEntity) {
    this.id = homeEntity?.id || 0;
    this.title = homeEntity?.title || '';
    this.description = homeEntity?.description || '';
    this.address_id = homeEntity?.address_id || 0;
    this.area = homeEntity?.area || 0;
    this.deposit = homeEntity?.deposit || 0;
    this.price = homeEntity?.price || 0;
    this.rating = homeEntity?.rating || 0;
    this.owner_id = homeEntity?.owner_id || 0;
    this.gender = homeEntity?.gender || 0;
    this.max_number_people = homeEntity?.max_number_people || 0;
    this.status = homeEntity?.status || 0;
    this.services = homeEntity?.services || [];
    this.latitude = homeEntity?.latitude || '';
    this.longitude = homeEntity?.longitude || '';
    this.image_url = homeEntity?.image_url || [];
    this.deposit_amount = homeEntity?.deposit_amount || 0;
    this.withdrawal_period = homeEntity?.withdrawal_period || 0;
    this.type = homeEntity?.type || 0;
    this.view_count = homeEntity?.view_count || 0;
    this.created_at = UtilsTime.formatDateTimeVNToString(homeEntity?.created_at) || '';
    this.updated_at = UtilsTime.formatDateTimeVNToString(homeEntity?.updated_at) || '';
  }
}

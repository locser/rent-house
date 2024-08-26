import { ApiProperty } from '@nestjs/swagger';

export class CreateHomeDto {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Unique identifier for the home',
  })
  id: number;

  @ApiProperty({
    type: String,
    example: 'Beautiful apartment near the park',
    description: 'Title or name of the home listing',
  })
  title: string;

  @ApiProperty({
    type: String,
    example: 'A cozy two-bedroom apartment with all amenities...',
    description: 'Detailed description of the home',
  })
  description: string;

  @ApiProperty({
    type: Number,
    example: 123,
    description: 'Identifier for the address associated with the home',
  })
  address_id: number;

  @ApiProperty({
    type: Number,
    example: 500,
    description: 'Deposit amount required for the home',
  })
  deposit: number;

  @ApiProperty({
    type: Number,
    example: 1500,
    description: 'Monthly rent price for the home',
  })
  price: number;

  @ApiProperty({
    type: Number,
    example: 4.5,
    description: 'Average rating of the home out of 5',
  })
  rating: number;

  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Type of the home (e.g., 1 for apartment, 2 for house)',
  })
  type: number;

  @ApiProperty({
    type: Number,
    example: 0,
    description: 'Preferred gender for tenants (e.g., 0 for any, 1 for male, 2 for female)',
  })
  gender: number;

  @ApiProperty({
    type: Number,
    example: 4,
    description: 'Maximum number of people allowed in the home',
  })
  max_number_people: number;

  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Current status of the home (e.g., 1 for available, 0 for unavailable)',
  })
  status: number;

  @ApiProperty({
    type: [Number],
    example: [1, 2, 3],
    description: 'List of service IDs associated with the home (e.g., Wi-Fi, parking)',
  })
  services: number[];

  @ApiProperty({
    type: String,
    example: '34.052235',
    description: 'Latitude of the home location',
  })
  latitude: string;

  @ApiProperty({
    type: String,
    example: '-118.243683',
    description: 'Longitude of the home location',
  })
  longitude: string;

  @ApiProperty({
    type: [String],
    example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
    description: 'List of image URLs for the home',
  })
  image_url: string[];

  @ApiProperty({
    type: Number,
    example: 500,
    description: 'Specific amount required for the deposit',
  })
  deposit_amount: number;

  @ApiProperty({
    type: Number,
    example: 30,
    description: 'Withdrawal period in days after the tenant leaves',
  })
  withdrawal_period: number;

  @ApiProperty({
    type: Number,
    example: 1,
    description: 'city id',
  })
  city_id: number;
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'id ward_id',
  })
  ward_id: number;
  @ApiProperty({
    type: Number,
    example: 1,
    description: ' id district_id',
  })
  district_id: number;
  @ApiProperty({
    type: String,
    example: 'hểm 1, nhà 1/2/3',
    description: 'địa chỉ cụ thể chi tiết',
  })
  detail: string;
}

import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsNumberString, IsString, ValidateNested } from 'class-validator';
import { MediaEntity } from '../entities/media.entity';

export class MediaFormatResponse {
  @IsString()
  @ApiProperty({
    type: String,
  })
  url: string;

  @IsString()
  @ApiProperty({
    type: String,
  })
  name: string;

  @IsInt()
  @ApiProperty({
    type: Number,
  })
  size: number;

  @IsInt()
  @ApiProperty({
    type: Number,
  })
  width: number;

  @IsInt()
  @ApiProperty({
    type: Number,
  })
  height: number;

  constructor(data?: MediaFormatResponse) {
    this.url = data?.url || '';
    this.name = data?.name || '';
    this.size = +data?.size || 0;
    this.width = +data?.width || 0;
    this.height = +data?.height || 0;
  }
}

export class MediaFormatOriginResponse extends MediaFormatResponse {
  @IsString()
  @ApiProperty({
    type: String,
  })
  link_full: string;

  constructor(data?: MediaFormatOriginResponse) {
    super(data);
    this.link_full = data?.link_full || '';
  }
}

export class MediaResponse {
  @IsNumberString({
    no_symbols: true,
  })
  @ApiProperty({
    type: String,
  })
  media_id: string;

  @IsInt()
  @ApiProperty({
    type: Number,
  })
  type: number;

  @ApiProperty({
    type: Number,
  })
  status: number;

  @IsString()
  @ApiProperty({
    type: String,
  })
  created_at: string | Date;

  @ApiProperty({
    type: String,
    example: 'anh nhà 1 ',
  })
  name: string;

  @ApiProperty({
    type: String,
    example: '/original.jpg',
  })
  short_url: string;
  @ApiProperty({
    type: String,
    example: '/original.jpg',
  })
  long_url: string;

  constructor(data?: MediaEntity) {
    this.media_id = data?.media_id || '0';
    this.type = +data?.type || 0;
    this.status = data?.status || 0;
    this.created_at = data?.created_at || new Date();
    this.name = data?.name || '';
    this.short_url = data?.short_url || '';
    this.long_url = data?.long_url || '';
  }
}

export class GenerateMediaResponseSwagger {
  @ApiProperty({
    type: [MediaResponse],
  })
  data: MediaResponse[];
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { MEDIA_TYPE } from 'src/utils.common/utils.enum.common/utils.media.enum';

export class UploadMedia {
  @ApiProperty({
    type: Number,
    description: `
    ${JSON.stringify(MEDIA_TYPE)}
    `,
  })
  type: MEDIA_TYPE;

  @ApiProperty({
    type: Number,
    description: 'media_id được tạo ra khi generate',
  })
  media_id: string;

  @ApiProperty({
    type: String,
    description: 'file cần upload',
    example: 'file cần upload',
  })
  file: Express.Multer.File;

  @ApiProperty({
    type: String,
    description: 'thumb cần upload, chỉ dùng cho video',
    example: 'file cần upload',
  })
  thumb?: Express.Multer.File;
}

export class UploadMediaDto {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => UploadMedia)
  @ApiProperty({
    type: UploadMedia,
    isArray: true,
  })
  medias: UploadMedia[];
}

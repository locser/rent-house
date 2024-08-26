import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, IsString, Matches, ValidateNested } from 'class-validator';
import { MEDIA_TYPE } from 'src/utils.common/utils.enum.common/utils.media.enum';

class Media {
  @IsNotEmpty()
  @IsString()
  @Matches(/\./)
  @ApiProperty({
    type: String,
    description: 'Tên của media',
  })
  name: string;

  @IsInt()
  @ApiProperty({
    type: Number,
    description: `
    ${JSON.stringify(MEDIA_TYPE)}
    `,
  })
  type: MEDIA_TYPE;

  // @IsInt()
  // @ApiProperty({
  //   type: Number,
  //   description: `
  //   0 - Media sẽ xoá sau 1 thời gian
  //   1 - Media sẽ được lưu
  //   `,
  // })
  // is_keep: number;

  // @IsInt()
  // @ApiProperty({
  //   type: Number,
  //   description: 'chiều rộng của media',
  // })
  // width: number;

  // @IsInt()
  // @ApiProperty({
  //   type: Number,
  //   description: 'chiều cao của media',
  // })
  // height: number;

  // @IsInt()
  // @ApiProperty({
  //   type: Number,
  //   description: 'kích thước của media',
  // })
  // size: number;
}

export class GenerateMediaDto {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => Media)
  @ApiProperty({
    type: Media,
    isArray: true,
    description: 'Mảng media cần tạo',
  })
  medias: Media[];
}

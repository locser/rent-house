import { Controller } from '@nestjs/common';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}
}

// @ApiOperation({ summary: 'Tạo record cho media cần upload' })
// @ApiOkResponse({ type: GenerateMediaResponseSwagger })
// @Post('generate')
// async generateMedia(@GetUserFromToken() user: UserEntity, @Body() body: GenerateMediaDto, @Res() res: Response) {
//   const data = await this.mediaService.generateMedia(user, body);
//   // return res.status(HttpStatus.OK).send(new BaseResponseData({ data }));
//   returnBaseResponse(res, data);
// }

// @ApiOperation({ summary: 'Tải lên media' })
// @ApiOkResponse({ type: BaseResponseData })
// @Post('upload')
// @UseInterceptors(AnyFilesInterceptor())
// async uploadMedia(@UploadedFiles() files: Express.Multer.File[], @Body() body: UploadMediaDto, @Res() res: Response) {
//   const result: Record<
//     string,
//     {
//       type: number;
//       media_id: string;
//       file: Express.Multer.File;
//       thumb: Express.Multer.File;
//     }
//   > = {};
//   for (let index = 0; index < body.medias.length; index++) {
//     const media = body.medias[index];

//     const { media_id } = media;
//     const type = +media.type;

//     let file: Express.Multer.File;
//     let thumb: Express.Multer.File;
//     files.forEach((item) => {
//       if (item.fieldname == `medias[${index}][file]`) file = item;
//       if (item.fieldname == `medias[${index}][thumb]`) thumb = item;
//     });

//     if (!(type in MEDIA_TYPE)) throw new HttpException('type không đúng', HttpStatus.BAD_REQUEST);
//     if (!media_id || isNaN(+media_id)) throw new HttpException('media_id không đúng', HttpStatus.BAD_REQUEST);
//     if (!file) throw new HttpException('file không tồn tại', HttpStatus.BAD_REQUEST);
//     if (!file.buffer || !Buffer.isBuffer(file.buffer)) throw new HttpException('file không đúng định dạng', HttpStatus.BAD_REQUEST);

//     result[index] = {
//       type: type,
//       media_id: media_id,
//       file: file,
//       thumb: thumb,
//     };
//   }
//   const medias = Object.values(result);

//   const data = await this.mediaService.uploadMedia(medias);
//   returnBaseResponse(res, data);
// }

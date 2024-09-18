import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MediaService } from './media.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  // @ApiOperation({ summary: 'Tải lên media' })
  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   console.log(file);
  // }

  @ApiOperation({ summary: 'Tải lên media (ảnh hoặc video)' })
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './res', // Thư mục lưu file
        filename: (req, file, cb) => {
          // Tạo tên file duy nhất: media-<Date.now()>.png hoặc .mp4
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname); // Lấy phần mở rộng của file
          const filename = `media-${uniqueSuffix}${ext}`;
          cb(null, filename);
        },
      }),
      fileFilter: (req, file, cb) => {
        // Cho phép cả ảnh và video
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|mp4|mkv|mov|avi)$/)) {
          return cb(new Error('Chỉ chấp nhận file hình ảnh hoặc video!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('File is empty');
    }
    // Trả về đường dẫn file sau khi upload
    const filePath = `public/res/${file.filename}`;
    return { filePath };
  }
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

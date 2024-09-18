import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { GenerateMediaDto } from './dto/generate-media.dto';
import { MEDIA_FORMAT, MEDIA_PATH, MEDIA_TYPE, MEDIA_URL_TYPE } from 'src/utils.common/utils.enum.common/utils.media.enum';
import moment from 'moment';
import { platform } from 'os';
import { UploadMedia } from './dto/upload-media.dto';
import { MediaResponse } from './response/generate-media.response';
import { nanoid } from 'nanoid';
import { MediaEntity } from './entities/media.entity';
import { BOOLEAN_ENUM } from 'src/utils.common/utils.enum.common/utils.boolean.enum';
import { fileTypeFromBuffer } from 'file-type';

@Injectable()
export class MediaService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,

    // @InjectQueue(MEDIA_QUEUE.NAME)
    // private readonly mediaQueue: Queue,
  ) {}
}

// async generateMedia(user: UserEntity, body: GenerateMediaDto) {
//   const DEFAULT_NAME_MEDIA = `smart-room-${user.id}`;
//   const BUCKET = 'smart-home';
//   return await this.dataSource.transaction(async (manager) => {
//     return await Promise.all(
//       body.medias.map(async (media) => {
//         const { name, type } = media;

//         const mediaExtension = name.split('.').pop();
//         const prefix = `${BUCKET}/${moment().format('YYYY/MM/DD')}`;

//         let commonPath = '';
//         switch (type) {
//           case MEDIA_TYPE.IMAGE:
//             commonPath = `${prefix}${MEDIA_PATH.IMAGE_PATH}`;
//             break;
//           case MEDIA_TYPE.VIDEO:
//             commonPath = `${prefix}${MEDIA_PATH.VIDEO_PATH}`;
//             break;
//           case MEDIA_TYPE.AUDIO:
//             commonPath = `${prefix}${MEDIA_PATH.AUDIO_PATH}`;
//             break;
//           case MEDIA_TYPE.FILE:
//             commonPath = `${prefix}${MEDIA_PATH.FILE_PATH}`;
//             break;
//           default:
//             throw new HttpException('type không tồn tại', HttpStatus.BAD_REQUEST);
//         }

//         // const originalUrl = nanoid();
//         // const originalPath = commonPath + '/' + DEFAULT_NAME_MEDIA + originalUrl + '.' + mediaExtension;

//         const newMedia = manager.create(MediaEntity, {
//           user_id: user.id,
//           user_type: platform,
//           // short_url: originalUrl,
//           // long_url: originalPath,
//           type: type,
//           name: name,
//           format: MEDIA_FORMAT.ORIGINAL,
//         });
//         await manager.save(newMedia);

//         return new MediaResponse(newMedia);
//       }),
//     );
//   });
// }

// async uploadMedia(medias: UploadMedia[]) {
//   await Promise.all(
//     medias.map(async (item) => {
//       const media = await this.dataSource.getRepository(MediaEntity).find({
//         where: {
//           media_id: item.media_id,
//           status: BOOLEAN_ENUM.FALSE,
//         },
//       });
//       if (media.length === 0) throw new HttpException('media không tồn tại', HttpStatus.BAD_REQUEST);

//       // const mediaPaths = this.extractMediaPaths(media);

//       const mimeType = await fileTypeFromBuffer(item.file.buffer);
//       item.file.mimetype = mimeType?.mime || item.file.mimetype;

//       // const queueData:  = {
//       //   type: item.type,
//       //   media_paths: mediaPaths,
//       //   file: item.file,
//       //   thumb: item.thumb,
//       // };
//       // await this.mediaQueue.add(MEDIA_QUEUE.UPLOAD_MEDIA, queueData, {
//       //   attempts: 5,
//       // });
//     }),
//   );
// }

// // private extractMediaPaths(mediaList: MediaEntity[]) {
// //   return shortUrlList.reduce(
// //     (result, item) => {
// //       const { short_url, long_url } = item;
// //       const firstSlashIndex = long_url.indexOf('/');
// //       const secondSlashIndex = long_url.indexOf('/', firstSlashIndex + 1);

// //       if (item.format == MEDIA_FORMAT.ORIGINAL) {
// //         result.bucket = long_url.slice(1, secondSlashIndex);
// //         result.originalPath = long_url.slice(secondSlashIndex);
// //         result.originalShortUrl = short_url;
// //       } else if (item.format == MEDIA_FORMAT.MEDIUM) {
// //         result.mediumPath = long_url.slice(secondSlashIndex);
// //         result.mediumShortUrl = short_url;
// //       } else if (item.format == MEDIA_FORMAT.THUMBNAIL) {
// //         result.thumbnailPath = long_url.slice(secondSlashIndex);
// //         result.thumbnailShortUrl = short_url;
// //       }

// //       return result;
// //     },
// //     {
// //       bucket: '',
// //       originalPath: '',
// //       originalShortUrl: '',
// //       mediumPath: '',
// //       mediumShortUrl: '',
// //       thumbnailPath: '',
// //       thumbnailShortUrl: '',
// //     },
// //   );
// // }

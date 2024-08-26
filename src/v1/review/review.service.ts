import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReviewDTO } from './dto/create-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from '../shared/review.entity';
import { Repository } from 'typeorm';
import { BookingEntity } from '../booking/entities/booking.entity';
import { UserEntity } from '../shared/user.entity';
import { TYPE_PLATFORM } from '../auth/auth.guard';
import { BOOKING_STATUS } from 'src/utils.common/utils.enum.common/utils.booking.enum';
import { DataSourceService } from 'src/database-source/database_source.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly selfRepository: Repository<ReviewEntity>,

    private dataSourceService: DataSourceService,
  ) {}

  async create(user: UserEntity, createReviewDTO: CreateReviewDTO) {
     const { content, home_id, rating} = createReviewDTO;
     console.log({ content, home_id, rating})
     const hasBooked: BookingEntity = await this.dataSourceService.findOne<BookingEntity>(BookingEntity, {
      user_booking_id: user.id,
      status: BOOKING_STATUS.ACCEPTED,
      home_id: home_id
    });

    console.log(hasBooked)
     if (!hasBooked) {
       throw new HttpException('Bạn chưa trải nghiệm phòng này để có thể đánh giá.', HttpStatus.BAD_REQUEST);
     }
 
     const review = new ReviewEntity()
     review.content = content;
     review.home_id = home_id;
     review.rating = rating;
     review.user_id = user.id;

    return await this.dataSourceService.save<ReviewEntity>(ReviewEntity, review);
  }

  async findAllReviews(id: number, offset: number, page, limit){
    const queryBuilder = this.selfRepository.createQueryBuilder('review')
      .leftJoin(UserEntity, 'user', 'user.id = review.user_id') // Join với UserEntity
      .select([
        'review.id AS review_id',
        'review.content AS review_content',
        'review.home_id AS review_home_id',
        'review.rating AS review_rating',
        'user.full_name AS user_full_name', // Chọn chỉ field full_name từ UserEntity
      ])
      .skip(offset)
      .take(limit);
      return {
        total_record: await queryBuilder.getCount(),
        data: (await queryBuilder.getRawAndEntities()).raw
      }
  }

  async findReviewsByHomeId(homeId: number): Promise<ReviewEntity[]> {
    return this.dataSourceService.find<ReviewEntity>(ReviewEntity, { home_id: homeId });
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportEntity } from '../shared/report.entity';
import { Repository } from 'typeorm';
import { DataSourceService } from 'src/database-source/database_source.service';
import { CreateReportDTO } from './dto/create.dto';
import { UserEntity } from '../user/entities/user.entity';
import { BookingEntity } from '../booking/entities/booking.entity';
import { BOOKING_STATUS } from 'src/utils.common/utils.enum.common/utils.booking.enum';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(ReportEntity)
    private readonly selfRepository: Repository<ReportEntity>,

    private dataSourceService: DataSourceService,
  ) {}

  async create(user: UserEntity, createreportDTO: CreateReportDTO) {
    const { content, home_id } = createreportDTO;

    const hasBooked: BookingEntity = await this.dataSourceService.findOne<BookingEntity>(BookingEntity, {
      user_booking_id: user.id,
      status: BOOKING_STATUS.ACCEPTED,
      home_id: home_id,
    });

    if (!hasBooked) {
      throw new HttpException('Bạn chưa trải nghiệm phòng này để có thể report.', HttpStatus.BAD_REQUEST);
    }

    const report = new ReportEntity();
    report.content = content;
    report.home_id = home_id;
    report.user_id = user.id;

    return await this.dataSourceService.save<ReportEntity>(ReportEntity, report);
  }

  async findAllReport(id: number, offset: number, page, limit) {
    const queryBuilder = this.selfRepository
      .createQueryBuilder('report')
      .leftJoin(UserEntity, 'user', 'user.id = report.user_id') // Join với UserEntity
      .select([
        'report.id AS report_id',
        'report.content AS report_content',
        'report.home_id AS report_home_id',
        'report.status AS report_home_status',
        'user.full_name AS user_full_name', // Chọn chỉ field full_name từ UserEntity
      ])
      .skip(offset)
      .take(limit);

    if (id !== 0) {
      queryBuilder.where('report.home_id = :home_id', { home_id: id });
      //  queryBuilder.where('report.status = :status', { status: 1 })
    }

    return {
      total_record: await queryBuilder.getCount(),
      data: (await queryBuilder.getRawAndEntities()).raw,
    };
  }

  async changeStatus(id: number) {
    return await this.selfRepository.update(
      {
        id,
      },
      {
        status: 0,
      },
    );
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import moment from 'moment-timezone';
import { DataSourceService } from 'src/database-source/database_source.service';
import { BOOKING_STATUS } from 'src/utils.common/utils.enum.common/utils.booking.enum';
import { Pagination } from 'src/utils.common/utils.pagination.pagination/utils.pagination';
import { In, Not, Repository } from 'typeorm';
import { TYPE_PLATFORM } from '../auth/auth.guard';
import { BodyBookingDto } from '../home/dto/body-booking.dto';
import { HomeEntity } from '../home/entities/home.entity';
import { EContractEntity } from '../shared/e_contract.entity';
import { UserEntity } from '../user/entities/user.entity';
import { BookingEntity } from './entities/booking.entity';
import { BookingResponse } from './response/booking.response';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly selfRepository: Repository<BookingEntity>,

    @InjectRepository(EContractEntity)
    private readonly eContractRepository: Repository<EContractEntity>,

    private dataSourceService: DataSourceService,
  ) {}

  async createContract(user: UserEntity, id: number) {
    const home = await this.selfRepository.findOne({
      where: {
        id: id,
        status: BOOKING_STATUS.CONFIRMED,
        owner_id: user.id,
      },
    });

    if (!home) {
      throw new HttpException('Không tìm thấy booking này', HttpStatus.BAD_REQUEST);
    }

    // const newECOntract = new EContractEntity();
    // newECOntract.booking_id = home.id;
  }

  async getMyBookings(user: UserEntity, pagination: Pagination): Promise<{ list: any; total_record: number }> {
    const [list, total_record] = await this.selfRepository.findAndCount({
      where: {
        user_booking_id: user.type == TYPE_PLATFORM.CUSTOMER ? user.id : undefined,
        owner_id: user.type == TYPE_PLATFORM.SELLER ? user.id : undefined,
      },
      take: pagination.getLimit(),
      skip: pagination.getOffset(),
      order: {
        id: 'DESC',
      },
    });

    //get info user and owner of home
    let listUserId = new Set<Number>();
    let listHomeId = new Set<Number>();
    for (let i = 0; i < list.length; i++) {
      listUserId.add(list[i].user_booking_id);
      listUserId.add(list[i].owner_id);
      listHomeId.add(list[i].home_id);
    }
    const users = await this.dataSourceService.find<UserEntity>(UserEntity, {
      id: In(Array.from(listUserId)),
    });

    const homes = await this.dataSourceService.find<HomeEntity>(HomeEntity, {
      id: In(Array.from(listHomeId)),
    });

    const userMap = {};
    const homeMap = {};

    for (let i = 0; i < users.length; i++) {
      userMap[users[i]?.id || 0] = users[i];
    }
    for (let i = 0; i < homes.length; i++) {
      homeMap[homes[i].id] = homes[i];
    }

    return {
      list: list.map(
        (booking) => new BookingResponse(booking, homeMap[booking.home_id], userMap[booking.user_booking_id], userMap[booking.owner_id]),
      ),
      total_record: total_record,
    };
  }

  async updateEntity(user: UserEntity, id: number, createBookingDto: BodyBookingDto) {
    const booking: BookingEntity = await this.dataSourceService.findOne<BookingEntity>(BookingEntity, {
      id: id,
      user_booking_id: user.type == TYPE_PLATFORM.CUSTOMER ? user.id : undefined,
      owner_id: user.type == TYPE_PLATFORM.SELLER ? user.id : undefined,
      status: Not(In[(BOOKING_STATUS.CANCELLED, BOOKING_STATUS.COMPLETED)]),
    });

    if (!booking) {
      throw new HttpException('Không tìm thấy booking này', HttpStatus.BAD_REQUEST);
    }

    booking.home_ready_date = new Date(moment(createBookingDto.booking_date).format('YYYY-MM-DD HH:mm') || '');

    booking.note = createBookingDto.note;
    booking.booking_detail = createBookingDto.booking_detail;
    booking.status = createBookingDto.status;

    return await this.dataSourceService.save<BookingEntity>(BookingEntity, booking);
  }

  async getDetail(user: UserEntity, id: number) {
    const booking: BookingEntity = await this.dataSourceService.findOne<BookingEntity>(BookingEntity, {
      id: id,
      user_booking_id: user.type == TYPE_PLATFORM.CUSTOMER ? user.id : undefined,
      owner_id: user.type == TYPE_PLATFORM.SELLER ? user.id : undefined,
      status: Not(In[(BOOKING_STATUS.CANCELLED, BOOKING_STATUS.COMPLETED)]),
    });

    if (!booking) {
      throw new HttpException('Không tìm thấy booking này', HttpStatus.BAD_REQUEST);
    }

    const home: HomeEntity = await this.dataSourceService.findOne<HomeEntity>(HomeEntity, {
      id: booking.home_id,
    });

    const userBooking: UserEntity = await this.dataSourceService.findOne<UserEntity>(UserEntity, {
      id: booking.user_booking_id,
    });

    const owner: UserEntity = await this.dataSourceService.findOne<UserEntity>(UserEntity, {
      id: booking.owner_id,
    });

    return new BookingResponse(booking, home, userBooking, owner);
  }

  async updateStatus(user: UserEntity, id: number, status: number) {
    const booking: BookingEntity = await this.dataSourceService.findOne<BookingEntity>(BookingEntity, {
      id: id,
      user_booking_id: user.type == TYPE_PLATFORM.CUSTOMER ? user.id : undefined,
      owner_id: user.type == TYPE_PLATFORM.SELLER ? user.id : undefined,
      status: Not(In[(BOOKING_STATUS.CANCELLED, BOOKING_STATUS.COMPLETED)]),
    });

    if (!booking) {
      throw new HttpException('Không tìm thấy booking này', HttpStatus.BAD_REQUEST);
    }

    booking.status = status;

    return await this.dataSourceService.save<BookingEntity>(BookingEntity, booking);
  }

  // async create(createBooking: CreateBookingDto): Promise<BookingEntity> {
  //   const newBooking = this.selfRepository.create({ ...new BookingEntity() });
  //   return await this.dataSourceService.save<BookingEntity>(BookingEntity, newBooking);
  // }
}

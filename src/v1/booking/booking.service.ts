import { Injectable } from '@nestjs/common';
import { CreateHomeDto } from '../home/dto/create-home.dto';
import { BookingEntity } from '../shared/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { DataSourceService } from 'src/database-source/database_source.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,

    private dataSourceService: DataSourceService,
  ) {}

  async create(createBooking: CreateBookingDto): Promise<BookingEntity> {
    //check ok

    const newBooking = this.bookingRepository.create({ ...new BookingEntity() });
    return await this.dataSourceService.save<BookingEntity>(BookingEntity, newBooking);
  }
}

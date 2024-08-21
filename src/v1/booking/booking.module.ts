import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceService } from 'src/database-source/database_source.service';
import { BookingEntity } from '../shared/booking.entity';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';

@Module({
  controllers: [BookingController],
  providers: [BookingService, DataSourceService],
  imports: [TypeOrmModule.forFeature([BookingEntity])],
})
export class BookingModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceService } from 'src/database-source/database_source.service';
import { EContractEntity } from '../shared/e_contract.entity';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { BookingEntity } from './entities/booking.entity';

@Module({
  controllers: [BookingController],
  providers: [BookingService, DataSourceService],
  imports: [TypeOrmModule.forFeature([BookingEntity, EContractEntity])],
})
export class BookingModule {}

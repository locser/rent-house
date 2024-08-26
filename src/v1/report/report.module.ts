import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { DataSourceService } from 'src/database-source/database_source.service';
import { ReportEntity } from '../shared/report.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ReportController],
  providers: [ReportService, DataSourceService],
  imports: [TypeOrmModule.forFeature([ReportEntity])],
})
export class ReportModule {}

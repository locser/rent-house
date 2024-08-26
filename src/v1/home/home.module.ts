import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeEntity } from './entities/home.entity';
import { DataSourceService } from 'src/database-source/database_source.service';

@Module({
  controllers: [HomeController],
  providers: [HomeService, DataSourceService],
  imports: [TypeOrmModule.forFeature([HomeEntity])],
})
export class HomeModule {}

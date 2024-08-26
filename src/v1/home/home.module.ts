import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeEntity } from './entities/home.entity';
import { DataSourceService } from 'src/database-source/database_source.service';
import { ServiceEntity } from './entities/service.entity';
import { ServiceController } from './service.controller';

@Module({
  controllers: [HomeController, ServiceController],
  providers: [HomeService, DataSourceService],
  imports: [TypeOrmModule.forFeature([HomeEntity, ServiceEntity])],
})
export class HomeModule {}

import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeEntity } from '../shared/home.entity';
import { HomeDetailEntity } from '../shared/home-detail.entity';

@Module({
  controllers: [HomeController],
  providers: [HomeService],
  imports: [TypeOrmModule.forFeature([HomeEntity, HomeDetailEntity])],
})
export class HomeModule {}

import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { DataSourceService } from 'src/database-source/database_source.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from '../shared/review.entity';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, DataSourceService],
  imports: [TypeOrmModule.forFeature([ReviewEntity])],
})
export class ReviewModule {}

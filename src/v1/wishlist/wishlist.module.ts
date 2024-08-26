import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistEntity } from './entities/wishlist.entity';
import { WishlistsController } from './wishlist.controller';
import { WishlistsService } from './wishlist.service';
import { DataSourceService } from 'src/database-source/database_source.service';

@Module({
  imports: [TypeOrmModule.forFeature([WishlistEntity])],
  controllers: [WishlistsController],
  providers: [WishlistsService, DataSourceService],
})
export class WishlistModule {}

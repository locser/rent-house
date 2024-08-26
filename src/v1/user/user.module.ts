import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceService } from 'src/database-source/database_source.service';
import { AddressEntity } from '../shared/address.entity';
import { BlockEntity } from './entities/block.entity';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, BlockEntity, AddressEntity])],
  controllers: [UserController],
  providers: [UserService, DataSourceService],
})
export class UserModule {}

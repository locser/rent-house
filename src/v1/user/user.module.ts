import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../shared/user.entity';

import { BlockEntity } from '../shared/block.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, BlockEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

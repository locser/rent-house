import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockEntity } from '../user/entities/block.entity';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [TypeOrmModule.forFeature([UserEntity, BlockEntity])],
  exports: [AuthService],
})
export class AuthModule {}

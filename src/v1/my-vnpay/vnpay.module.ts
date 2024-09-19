import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionHistoryEntity } from './entities/transaction_history.entity';
import { WalletEntity } from './entities/wallet.entity';
import { MyVnpayController } from './vnpay.controller';
import { MyVnpayService } from './vnpay.service';

@Module({
  controllers: [MyVnpayController],
  providers: [MyVnpayService],

  imports: [TypeOrmModule.forFeature([WalletEntity, TransactionHistoryEntity])],
})
export class MyVnpayModule {}

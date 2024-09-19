import { Injectable } from '@nestjs/common';
import { WalletEntity } from './entities/wallet.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionHistoryEntity } from './entities/transaction_history.entity';

@Injectable()
export class MyVnpayService {
  constructor(
    @InjectRepository(WalletEntity)
    private readonly selfRepository: Repository<WalletEntity>,

    @InjectRepository(TransactionHistoryEntity)
    private readonly transactionHistoryRepository: Repository<TransactionHistoryEntity>,
  ) {}

  // get all wallets
  async getAllWallets(user_id: number) {
    return await this.selfRepository.find({ where: { user_id: user_id } });
  }

  async getTransactionHistory(user_id: number) {
    return await this.transactionHistoryRepository.find({ where: { user_id: user_id } });
  }
}

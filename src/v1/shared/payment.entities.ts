import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @Column({ type: 'bigint', default: 0 })
  user_id: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  merchant_id: string;

  @Column({ type: 'int', default: 0 })
  subscription_period_by_day: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  amount: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  bank_name: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  bank_account_name: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  bank_account_number: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  hash_key: string;

  @Column({ type: 'number', default: false })
  is_refund: number;

  @Column({ type: 'number', default: false })
  status: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('payments')
export class PaymentEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

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

  @Column({ type: 'smallint', default: 0 })
  is_refund: number;

  @Column({ type: 'smallint', default: 0 })
  status: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}

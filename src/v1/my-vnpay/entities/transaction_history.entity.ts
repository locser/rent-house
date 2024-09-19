import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('transaction_history')
export class TransactionHistoryEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'user_id', type: 'int' })
  user_id: number;

  @Column({ name: 'transaction_type', type: 'int', default: 0 })
  transaction_type: number;

  @Column({ name: 'amount', type: 'int' })
  amount: number;

  @Column({ name: 'description', type: 'text', nullable: true })
  description?: string; // Optional field

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}

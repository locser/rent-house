import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('wallets')
export class WalletEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'user_id', type: 'int', default: 0 })
  user_id: number;

  @Column({ name: 'balance', type: 'int', default: 0 })
  balance: number;

  @Column({ name: 'status', type: 'smallint', default: 0 })
  status: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}

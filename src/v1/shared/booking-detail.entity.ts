import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('booking_details')
export class BookingDetails {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @Column({ type: 'int', default: 0 })
  booking_id: number;

  @Column({ type: 'int', default: 0 })
  room_id: number;

  @Column({ type: 'int', default: 0 })
  payment_id: number;

  @Column({ type: 'decimal', precision: 20, scale: 2, default: 0 })
  total_price: string;

  @Column({ type: 'jsonb', default: 0 })
  booking_detail_option: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}

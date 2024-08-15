import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 0 })
  company_id: number;

  @Column({ type: 'int', default: 0 })
  user_booking_id: number;

  @Column({ type: 'int', default: 0 })
  user_edit_id: number;

  @Column({ type: 'bigint', default: 0 })
  home_id: string;

  @Column({ type: 'tinyint', width: 1 })
  home_type: boolean;

  @Column({ type: 'varchar', length: 255, default: '' })
  booking_number: string;

  @Column({ type: 'varchar', length: 20, default: '' })
  home_ready_date: string;

  @Column({ type: 'text', default: '' })
  note: string;

  @Column({ type: 'longtext', nullable: true, charset: 'utf8mb4', collation: 'utf8mb4_bin' })
  booking_detail: string | null;

  @Column({ type: 'int', default: 0 })
  payment_status: number;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  is_send_mail: boolean;

  @Column({ type: 'int', default: 0 })
  status: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}

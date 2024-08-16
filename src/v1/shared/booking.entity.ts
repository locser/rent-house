import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('bookings')
export class BookingEntity {
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

  @Column({ type: 'smallint', width: 1 })
  home_type: number;

  @Column({ type: 'varchar', length: 255, default: '' })
  booking_number: string;

  @Column({ type: 'varchar', length: 20, default: '' })
  home_ready_date: string;

  @Column({ type: 'varchar', default: '' })
  note: string;

  @Column({ type: 'varchar', nullable: true })
  booking_detail: string;

  @Column({ type: 'int', default: 0 })
  payment_status: number;

  @Column({ type: 'smallint', width: 1, default: 0 })
  is_send_mail: number;

  @Column({ type: 'int', default: 0 })
  status: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}

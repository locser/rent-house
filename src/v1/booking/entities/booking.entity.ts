import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('bookings')
export class BookingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({ type: 'int', default: 0 })
  // home_id: number;

  @Column({ type: 'int', default: 0 })
  user_booking_id: number;

  @Column({ type: 'int', default: 0 })
  user_edit_id: number;

  @Column({ type: 'int', default: 0 })
  home_id: number;

  @Column({ type: 'smallint', width: 1 })
  home_type: number;

  @Column({ type: 'int', default: 0 })
  owner_id: number;

  @Column({ type: 'int', default: 0 })
  payment_id: number;

  @Column({ type: 'decimal', precision: 20, scale: 2, default: 0 })
  total_price: string;

  // @Column({ type: 'jsonb', default: 0 })
  // booking_detail_option: string;

  // khi nào phòng trọ có thể sẵn sàng ở
  @Column({ type: 'timestamp', nullable: false })
  home_ready_date: Date;

  // cột này để xem thời gian đặt lịch
  @Column({ type: 'timestamp', nullable: false })
  booking_date: Date;

  // @Column({ type: 'varchar', length: 255, default: '' })
  // booking_number: string;

  // @Column({ type: 'timestamp', length: 20, default: '' })
  // home_ready_date: Date;

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

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}

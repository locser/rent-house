import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('homes')
export class HomeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, default: '' })
  title: string;

  @Column({ type: 'varchar', default: '' })
  description: string;

  @Column({ type: 'int', default: 0 })
  address_id: number;

  //diện tích
  @Column({ type: 'decimal', nullable: false, default: 0 })
  area: number;

  @Column({ type: 'decimal', nullable: false, default: 0 })
  deposit: number;

  @Column({ type: 'decimal', nullable: false, default: 0 })
  price: number;

  @Column({ type: 'decimal', default: 0 })
  rating: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  owner_id: number;

  // id người thuê
  @Column({ type: 'int', nullable: false, default: 0 })
  tenant_id: number;

  @Column({ type: 'smallint', default: 0 })
  gender: number; // Cho nam hay nữ thuê

  @Column({ type: 'smallint', default: 0 })
  max_number_people: number; // số người

  @Column({ type: 'smallint', default: 0 })
  status: number; // trạng thái của phòng

  @Column({ type: 'jsonb', default: [] })
  services: number[]; // dịch vụ

  // lat, long
  @Column({ type: 'decimal', precision: 10, scale: 6, default: 0 })
  latitude: string;

  @Column({ type: 'decimal', precision: 10, scale: 6, default: 0 })
  longitude: string;

  @Column({ nullable: false, type: 'jsonb', default: [] })
  image_url: string[];

  @Column({ type: 'decimal', precision: 20, scale: 2, default: 0.0 })
  deposit_amount: number; // Số tiền cọc

  @Column({ type: 'int', default: 30 })
  withdrawal_period: number; // Thời gian có thể rút cọc (tính bằng ngày)

  @Column({ type: 'int', default: 0 })
  type: number;

  // số lượng đã hẹn xem
  @Column({ type: 'int', default: 0 })
  view_count: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}

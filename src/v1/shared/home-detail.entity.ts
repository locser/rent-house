import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('home_details')
export class HomeDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int', default: 0 })
  bedrooms: number;

  @Column({ type: 'int', default: 0 })
  bathrooms: number;

  @Column({ nullable: false, type: 'jsonb' })
  image_url: string[];

  @Column({ type: 'int', default: 1 })
  min_rent_months: number; // Số tháng thuê tối thiểu

  @Column({ type: 'decimal', precision: 20, scale: 2, default: 0.0 })
  deposit_amount: string; // Số tiền cọc

  @Column({ type: 'int', default: 30 })
  withdrawal_period: number; // Thời gian có thể rút cọc (tính bằng ngày)

  @Column({ type: 'smallint', default: 0 })
  has_wifi: number; // Có wifi hay không

  // lat, long
  @Column({ type: 'decimal', precision: 10, scale: 6, default: 0 })
  latitude: string;

  @Column({ type: 'decimal', precision: 10, scale: 6, default: 0 })
  longitude: string;

  @Column({ type: 'jsonb', default: 0 })
  home_detail_option: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

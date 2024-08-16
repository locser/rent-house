import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('homes')
export class HomeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, default: '' })
  title: string;

  @Column({ type: 'varchar', default: '' })
  description: string;

  @Column({ type: 'varchar', default: '' })
  cover: string;

  @Column({ type: 'int', comment: 'ảnh cover hay là video cover' })
  cover_type: number;

  @Column({ type: 'varchar', default: '' })
  address: string;

  //diện tích
  @Column({
    type: 'int',
    nullable: false,
  })
  area: number;

  @Column({ type: 'decimal', nullable: false })
  price: number;

  @Column({ type: 'decimal', default: 0 })
  rating: number;

  @Column({ type: 'int', default: 0 })
  status: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  owner: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}

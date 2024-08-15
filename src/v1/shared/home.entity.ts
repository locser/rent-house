import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('homes')
export class HomeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  cover: string;

  @Column({ type: 'int', comment: 'ảnh cover hay là video cover' })
  cover_type: number;

  @Column()
  address: string;

  //diện tích
  @Column({
    type: 'int',
    nullable: false,
  })
  area: number;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ default: true })
  status: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  owner: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

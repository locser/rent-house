import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('services')
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 0 })
  price: number;
  @Column({ type: 'int', default: 0 })
  type: number; // tính tiền hàng tháng  hay sao
  @Column({ type: 'text', default: '' })
  name: string;
  @Column({ type: 'text', default: '' })
  description: string;

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}

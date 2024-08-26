import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('addresses')
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 0 })
  city_id: number;

  @Column({ type: 'int', default: 0 })
  ward_id: number;

  @Column({ type: 'int', default: 0 })
  district_id: number;

  @Column({ type: 'text', default: '' })
  detail: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

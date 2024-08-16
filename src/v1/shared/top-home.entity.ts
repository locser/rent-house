import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('top_homes')
export class TopHomeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 0 })
  position: number;

  @Column({ type: 'smallint', default: 1 })
  is_active: number;

  @Column({ type: 'int', default: 0 })
  type: number;

  @Column({ nullable: false })
  valid_to_date: Date;

  @Column({ nullable: false })
  valid_from_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

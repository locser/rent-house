import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('reviews')
export class ReviewEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number; 

  @Column({ type: 'int' })
  user_id: number; 

  @Column({ type: 'int' })
  home_id: number; 

  @Column({ type: 'int', default: 0 })
  rating: number; 

  @Column({ type: 'int', default: 1 })
  status: number; 

  @Column({ type: 'varchar', length: 255, nullable: true })
  content: string; 

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('reviews')
export class ReviewEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  review_id: number; // ReviewID (Primary Key)

  // @ManyToOne(() => User)
  // @JoinColumn({ name: 'user_id' })
  @Column({ type: 'int' })
  user_id: number; // UserID (Foreign Key)

  // @ManyToOne(() => Home)
  // @JoinColumn({ name: 'home_id' })
  @Column({ type: 'int' })
  home_id: number; // HomeID (Foreign Key)

  @Column({ type: 'int', default: 0 })
  rating: number; // Rating

  @Column({ type: 'varchar', length: 255, nullable: true })
  comment: string; // Comment

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

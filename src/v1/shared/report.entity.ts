import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('reports')
export class ReportEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number; // ReviewID (Primary Key)

  @Column({ type: 'int' })
  user_id: number; // UserID (Foreign Key)

  @Column({ type: 'int' })
  home_id: number; // HomeID (Foreign Key)

  @Column({ type: 'text', default: '' })
  content: string;

  @Column({ type: 'smallint', default: 0 })
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

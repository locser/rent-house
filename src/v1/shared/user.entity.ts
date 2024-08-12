import { USER_STATUS } from 'src/utils.common/utils.enum.common/utils.user.enum';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true, default: '' })
  avatar: string;

  @Column({ type: 'varchar', default: '' })
  full_name: string;

  @Column({ type: 'varchar', nullable: false, default: '' })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: '' })
  address: string;

  @Column({ type: 'varchar', length: 11, nullable: false })
  phone: string;

  @Column({ type: 'tinyint', default: 0 })
  gender: number;

  @Column({ type: 'varchar', length: 255, nullable: true, default: '' })
  birthday: string;

  @Column({ type: 'varchar', length: 255, nullable: false, default: '' })
  email: string;

  @Column({ type: 'int', default: USER_STATUS.ACTIVE })
  status: USER_STATUS;

  @Column({
    type: 'simple-array',
    default: [1],
  })
  role: number[];

  @Column({ type: 'varchar', length: 255, default: '' })
  access_token: string;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}

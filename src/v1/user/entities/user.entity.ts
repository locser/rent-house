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

  @Column({ type: 'int', nullable: true, default: 0 })
  address: number;

  @Column({ type: 'varchar', length: 11, nullable: false, default: '' })
  phone: string;

  @Column({ type: 'int2', default: 0 })
  gender: number;

  @Column({ type: 'varchar', length: 255, nullable: true, default: '' })
  birthday: string;

  @Column({ type: 'varchar', length: 255, nullable: false, default: '' })
  email: string;

  @Column({ type: 'int', default: USER_STATUS.ACTIVE })
  status: USER_STATUS;

  @Column({
    type: 'varchar',
    default: '',
  })
  role: string;

  @Column({ type: 'int', default: 0, comment: '0: người mua, 1: admin, 2: người bán' })
  type: number;

  @Column({ type: 'varchar', length: 255, default: '' })
  access_token: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

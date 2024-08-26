import { MEDIA_FORMAT, MEDIA_TYPE } from 'src/utils.common/utils.enum.common/utils.media.enum';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('medias')
export class MediaEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({
    type: 'bigint',
    default: () => `currval('short_url_short_url_id_seq'::regclass)`,
  })
  media_id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  url: string;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'int' })
  status: number;

  @Column({
    type: 'varchar',
  })
  short_url: string;

  @Column({
    type: 'varchar',
  })
  long_url: string;

  @Column({
    type: 'smallint',
  })
  type: MEDIA_TYPE;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}

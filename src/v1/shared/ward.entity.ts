import { Column, CreateDateColumn, Entity, Index, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('wards')
// @Index('idx_wards_district', ['district_id'])
// @Index('idx_wards_unit', ['administrative_unit_id'])
export class WardEntity {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  // @Column({ type: 'varchar', length: 255, nullable: true })
  // name_en: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  full_name: string;

  // @Column({ type: 'varchar', length: 255, nullable: true })
  // full_name_en: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  code_name: string;

  // @Column({ type: 'varchar', length: 20, nullable: true })
  // district_code: string;

  // @Column({ type: 'int', nullable: true })
  // administrative_unit_id: number;

  @Column({ type: 'int', nullable: true })
  district_id: number;

  // @ManyToOne(() => AdministrativeUnit)
  // @JoinColumn({ name: 'administrative_unit_id' })
  // administrative_unit: AdministrativeUnit;

  // @ManyToOne(() => District)
  // @JoinColumn({ name: 'district_code', referencedColumnName: 'code' })
  // district: District;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}

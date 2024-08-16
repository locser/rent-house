import { Entity, PrimaryColumn, Column, Index, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('districts', { schema: 'public' })
export class DistrictEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  code: number;

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

  @Column({ type: 'varchar', length: 20, nullable: true })
  province_code: string;

  @Column({ type: 'int', nullable: true })
  administrative_unit_id: number;

  @Column({ type: 'int', nullable: true })
  province: number;

  // @ManyToOne(() => AdministrativeUnit)
  // @JoinColumn({ name: 'administrative_unit_id' })
  // administrative_unit: AdministrativeUnit;

  // @ManyToOne(() => Province)
  // @JoinColumn({ name: 'province_code', referencedColumnName: 'code' })
  // province: Province;
}

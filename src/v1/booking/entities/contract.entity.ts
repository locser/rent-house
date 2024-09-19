import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('contracts')
export class ContractEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'houseId', type: 'varchar', length: 255 })
  houseId: string;

  @Column({ name: 'lessor_id', type: 'varchar', length: 255 })
  lessorId: string;

  @Column({ name: 'dateRent', type: 'date' })
  dateRent: Date;

  @Column({ name: 'payTime', type: 'timestamp' })
  payTime: Date;

  @Column({ name: 'payMode', type: 'int' })
  payMode: number;

  @Column({ name: 'paymentId', type: 'int' })
  paymentId: number;

  @Column({ name: 'enable', type: 'boolean', default: true })
  enable: boolean;

  @Column({ name: 'penaltyFeeEndRent', type: 'bigint', default: 0 })
  penaltyFeeEndRent: number;

  @Column({ name: 'status', type: 'int' })
  status: number;

  @Column({ name: 'plusContract', type: 'varchar', length: 255, nullable: true })
  plusContract?: string;

  @Column({ name: 'renterId', type: 'int' })
  renterId: number;

  @CreateDateColumn({ name: 'createdAt', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

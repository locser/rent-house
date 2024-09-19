import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('e_contracts')
export class EContractEntity {
  @PrimaryGeneratedColumn('uuid') // Sử dụng UUID cho _id
  id: string;

  @Column({ type: 'varchar', length: 255 })
  contract_id: string;

  // @Column({ type: 'varchar', length: 255 })
  // contract_template_id: string;

  // @Column({ type: 'int' })
  // contract_temporary_id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'date' }) // Sử dụng kiểu dữ liệu date cho ngày
  valid_date: string;

  @Column({ type: 'varchar', length: 255 })
  signatures: string;

  // @Column({ type: 'int' })
  // documents: number;

  @CreateDateColumn() // Tự động tạo giá trị thời gian tạo
  created_at: Date;

  @UpdateDateColumn() // Tự động cập nhật thời gian khi có thay đổi
  updated_at: Date;

  @Column({ type: 'date' }) // Sử dụng kiểu dữ liệu date cho ngày
  end_date: string;

  // @Column({ type: 'varchar', length: 255 })
  // template_group_id: string;

  // @Column({ type: 'varchar', length: 255 })
  // template_id: string;

  @Column({ type: 'varchar', length: 255 })
  customer_id: string;

  @Column({ type: 'varchar', length: 255 })
  owner_id: string;

  @Column({ type: 'varchar', length: 255 })
  token_id: string;

  // @Column({ type: 'varchar', length: 255 })
  // contract_value: string;

  @Column({ type: 'varchar', nullable: true }) // Cho phép null
  creation_note: string;

  @Column({ type: 'int' })
  is_owner_signature: number;

  @Column({ type: 'int' })
  is_partner_signature: number;

  @Column({ type: 'int' })
  is_cancel_contract: number;

  @Column({ type: 'varchar', nullable: true }) // Cho phép null
  cancel_reason: string;

  @Column({ type: 'varchar', length: 255 })
  contract_file: string;

  @Column({ type: 'varchar', length: 255 })
  customer_name: string;

  // @Column({ type: 'int' })
  // customer_signing_limited: number;

  // @Column({ type: 'varchar', length: 255 })
  // customer_role: string;

  // @Column({ type: 'varchar', length: 255 })
  // customer_company_name: string;

  // @Column({ type: 'varchar', length: 255 })
  // customer_company_address: string;

  // @Column({ type: 'varchar', length: 255 })
  // customer_company_tax_code: string;

  // @Column({ type: 'varchar', length: 255 })
  // customer_gender: string;

  @Column({ type: 'date' }) // Sử dụng kiểu dữ liệu date cho ngày
  effective_date: string;

  @Column({ type: 'varchar', length: 255 })
  customer_phone: string;

  @Column({ type: 'int' })
  is_send: number;

  @Column({ type: 'int' })
  is_sign: number;
}

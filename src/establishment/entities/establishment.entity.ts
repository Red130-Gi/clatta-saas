import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm';
import { Tenant } from '../../tenant/entities/tenant.entity';

@Index(['name', 'tenantId'], { unique: true })
@Entity()
export class Establishment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Tenant, (tenant) => tenant.id, { eager: false })
  tenant: Tenant;

  @Column()
  tenantId: string;
}


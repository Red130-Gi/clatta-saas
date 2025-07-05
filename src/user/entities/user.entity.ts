import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm';
import { Tenant } from '../../tenant/entities/tenant.entity';

export enum UserRole {
  CENTRAL_ADMIN = 'central_admin',
  MANAGER = 'manager',
  TEACHER = 'teacher',
  PARENT = 'parent',
  STUDENT = 'student',
}

@Index(['email', 'tenantId'], { unique: true })
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.MANAGER })
  role: UserRole;

  @ManyToOne(() => Tenant, (tenant) => tenant.users, { eager: false })
  tenant: Tenant;

  @Column()
  tenantId: string;
}


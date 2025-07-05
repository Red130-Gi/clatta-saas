import { Tenant } from '../../tenant/entities/tenant.entity';
export declare enum UserRole {
    CENTRAL_ADMIN = "central_admin",
    MANAGER = "manager",
    TEACHER = "teacher",
    PARENT = "parent",
    STUDENT = "student"
}
export declare class User {
    id: string;
    email: string;
    passwordHash: string;
    role: UserRole;
    tenant: Tenant;
    tenantId: string;
}

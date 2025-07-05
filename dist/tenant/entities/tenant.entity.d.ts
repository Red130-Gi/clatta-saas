import { User } from '../../user/entities/user.entity';
export declare enum PlanType {
    FREE = "free",
    PRO = "pro",
    ENTERPRISE = "enterprise"
}
export declare class Tenant {
    id: string;
    name: string;
    plan: PlanType;
    users: User[];
}

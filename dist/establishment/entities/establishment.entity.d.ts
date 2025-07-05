import { Tenant } from '../../tenant/entities/tenant.entity';
export declare class Establishment {
    id: string;
    name: string;
    tenant: Tenant;
    tenantId: string;
}

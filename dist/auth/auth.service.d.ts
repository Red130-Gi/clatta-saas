import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { Tenant } from '../tenant/entities/tenant.entity';
export declare class AuthService {
    private readonly userRepo;
    private readonly tenantRepo;
    private readonly jwt;
    constructor(userRepo: Repository<User>, tenantRepo: Repository<Tenant>, jwt: JwtService);
    signUp(email: string, password: string, tenantName: string): Promise<{
        token: string;
    }>;
    validateUser(email: string, password: string): Promise<User>;
    login(email: string, password: string): Promise<{
        token: string;
    }>;
}

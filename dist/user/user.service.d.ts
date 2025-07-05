import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private readonly userRepo;
    constructor(userRepo: Repository<User>);
    create(tenantId: string, dto: CreateUserDto): Promise<User>;
    findAll(tenantId: string): Promise<User[]>;
    findOne(id: string, tenantId: string): Promise<User>;
    update(id: string, tenantId: string, dto: UpdateUserDto): Promise<User>;
    remove(id: string, tenantId: string): Promise<{
        deleted: boolean;
    }>;
}

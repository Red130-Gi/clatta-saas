import { Repository } from 'typeorm';
import { SchoolClass } from './entities/class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
export declare class ClassService {
    private readonly classRepo;
    constructor(classRepo: Repository<SchoolClass>);
    create(tenantId: string, dto: CreateClassDto): Promise<SchoolClass>;
    findAll(tenantId: string): Promise<SchoolClass[]>;
    findOne(id: string, tenantId: string): Promise<SchoolClass>;
    update(id: string, tenantId: string, dto: UpdateClassDto): Promise<SchoolClass>;
    remove(id: string, tenantId: string): Promise<{
        deleted: boolean;
    }>;
}

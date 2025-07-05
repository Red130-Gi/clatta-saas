import { Repository } from 'typeorm';
import { Establishment } from './entities/establishment.entity';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
export declare class EstablishmentService {
    private readonly estRepo;
    constructor(estRepo: Repository<Establishment>);
    create(tenantId: string, dto: CreateEstablishmentDto): Promise<Establishment>;
    findAll(tenantId: string): Promise<Establishment[]>;
    findOne(id: string, tenantId: string): Promise<Establishment>;
    update(id: string, tenantId: string, dto: UpdateEstablishmentDto): Promise<Establishment>;
    remove(id: string, tenantId: string): Promise<{
        deleted: boolean;
    }>;
}

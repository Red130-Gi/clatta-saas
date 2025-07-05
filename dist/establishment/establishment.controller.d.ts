import { Request } from 'express';
import { EstablishmentService } from './establishment.service';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
export declare class EstablishmentController {
    private readonly establishmentService;
    constructor(establishmentService: EstablishmentService);
    create(req: Request, dto: CreateEstablishmentDto): Promise<import("./entities/establishment.entity").Establishment>;
    findAll(req: Request): Promise<import("./entities/establishment.entity").Establishment[]>;
    findOne(id: string, req: Request): Promise<import("./entities/establishment.entity").Establishment>;
    update(id: string, req: Request, dto: UpdateEstablishmentDto): Promise<import("./entities/establishment.entity").Establishment>;
    remove(id: string, req: Request): Promise<{
        deleted: boolean;
    }>;
}

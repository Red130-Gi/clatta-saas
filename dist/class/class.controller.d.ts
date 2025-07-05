import { ClassService } from './class.service';
import { Request } from 'express';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
export declare class ClassController {
    private readonly classService;
    constructor(classService: ClassService);
    create(req: Request, createClassDto: CreateClassDto): Promise<import("./entities/class.entity").SchoolClass>;
    findAll(req: Request): Promise<import("./entities/class.entity").SchoolClass[]>;
    findOne(id: string, req: Request): Promise<import("./entities/class.entity").SchoolClass>;
    update(id: string, req: Request, updateClassDto: UpdateClassDto): Promise<import("./entities/class.entity").SchoolClass>;
    remove(id: string, req: Request): Promise<{
        deleted: boolean;
    }>;
}

import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
export declare class StudentService {
    private readonly studentRepo;
    constructor(studentRepo: Repository<Student>);
    create(tenantId: string, dto: CreateStudentDto): Promise<Student>;
    findAll(tenantId: string): Promise<Student[]>;
    findOne(id: string, tenantId: string): Promise<Student>;
    update(id: string, tenantId: string, dto: UpdateStudentDto): Promise<Student>;
    remove(id: string, tenantId: string): Promise<{
        deleted: boolean;
    }>;
}

import { StudentService } from './student.service';
import { Request } from 'express';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
export declare class StudentController {
    private readonly studentService;
    constructor(studentService: StudentService);
    create(req: Request, createStudentDto: CreateStudentDto): Promise<import("./entities/student.entity").Student>;
    findAll(req: Request): Promise<import("./entities/student.entity").Student[]>;
    findOne(id: string, req: Request): Promise<import("./entities/student.entity").Student>;
    update(id: string, req: Request, updateStudentDto: UpdateStudentDto): Promise<import("./entities/student.entity").Student>;
    remove(id: string, req: Request): Promise<{
        deleted: boolean;
    }>;
}

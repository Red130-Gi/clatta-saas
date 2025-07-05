import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {}

  async create(tenantId: string, dto: CreateStudentDto) {
    const exists = await this.studentRepo.findOne({ where: { name: dto.name, tenantId } });
    if (exists) throw new BadRequestException('Student name already exists for this tenant');
    const entity = this.studentRepo.create({ ...dto, tenantId });
    return this.studentRepo.save(entity);
  }

  async findAll(tenantId: string) {
    return this.studentRepo.find({ where: { tenantId } });
  }

  async findOne(id: string, tenantId: string) {
    const entity = await this.studentRepo.findOne({ where: { id, tenantId } });
    if (!entity) throw new NotFoundException();
    return entity;
  }

  async update(id: string, tenantId: string, dto: UpdateStudentDto) {
    const entity = await this.findOne(id, tenantId);
    Object.assign(entity, dto);
    return this.studentRepo.save(entity);
  }

  async remove(id: string, tenantId: string) {
    const entity = await this.findOne(id, tenantId);
    await this.studentRepo.remove(entity);
    return { deleted: true };
  }
}

import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolClass } from './entities/class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(SchoolClass)
    private readonly classRepo: Repository<SchoolClass>,
  ) {}

  async create(tenantId: string, dto: CreateClassDto) {
    const exists = await this.classRepo.findOne({ where: { name: dto.name, tenantId } });
    if (exists) {
      throw new BadRequestException('Class name already exists for this tenant');
    }
    const entity = this.classRepo.create({ ...dto, tenantId });
    return this.classRepo.save(entity);
  }

  async findAll(tenantId: string) {
    return this.classRepo.find({ where: { tenantId } });
  }

  async findOne(id: string, tenantId: string) {
    const entity = await this.classRepo.findOne({ where: { id, tenantId } });
    if (!entity) throw new NotFoundException();
    return entity;
  }

  async update(id: string, tenantId: string, dto: UpdateClassDto) {
    const entity = await this.findOne(id, tenantId);
    Object.assign(entity, dto);
    return this.classRepo.save(entity);
  }

  async remove(id: string, tenantId: string) {
    const entity = await this.findOne(id, tenantId);
    await this.classRepo.remove(entity);
    return { deleted: true };
  }
}

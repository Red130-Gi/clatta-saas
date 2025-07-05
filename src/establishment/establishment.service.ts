import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Establishment } from './entities/establishment.entity';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';

@Injectable()
export class EstablishmentService {
  constructor(
    @InjectRepository(Establishment)
    private readonly estRepo: Repository<Establishment>,
  ) {}

  async create(tenantId: string, dto: CreateEstablishmentDto) {
    const exists = await this.estRepo.findOne({ where: { name: dto.name, tenantId } });
    if (exists) {
      throw new BadRequestException('Establishment name already exists for this tenant');
    }
    const est = this.estRepo.create({ ...dto, tenantId });
    return this.estRepo.save(est);
  }

  async findAll(tenantId: string) {
    return this.estRepo.find({ where: { tenantId } });
  }

  async findOne(id: string, tenantId: string) {
    const est = await this.estRepo.findOne({ where: { id, tenantId } });
    if (!est) throw new NotFoundException();
    return est;
  }

  async update(id: string, tenantId: string, dto: UpdateEstablishmentDto) {
    const est = await this.findOne(id, tenantId);
    Object.assign(est, dto);
    return this.estRepo.save(est);
  }

  async remove(id: string, tenantId: string) {
    const est = await this.findOne(id, tenantId);
    await this.estRepo.remove(est);
    return { deleted: true };
  }
}

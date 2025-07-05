import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async create(tenantId: string, dto: CreateUserDto) {
    const existing = await this.userRepo.findOne({ where: { email: dto.email, tenantId } });
    if (existing) {
      throw new BadRequestException('Email already exists for this tenant');
    }
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({
      email: dto.email,
      passwordHash,
      role: dto.role,
      tenantId,
    });
    return this.userRepo.save(user);
  }

  async findAll(tenantId: string) {
    return this.userRepo.find({ where: { tenantId } });
  }

  async findOne(id: string, tenantId: string) {
    const user = await this.userRepo.findOne({ where: { id, tenantId } });
    if (!user) throw new NotFoundException();
    return user;
  }

  async update(id: string, tenantId: string, dto: UpdateUserDto) {
    const user = await this.findOne(id, tenantId);
    if (dto.password) {
      dto = { ...dto, passwordHash: await bcrypt.hash(dto.password, 10) } as any;
      delete (dto as any).password;
    }
    Object.assign(user, dto);
    return this.userRepo.save(user);
  }

  async remove(id: string, tenantId: string) {
    const user = await this.findOne(id, tenantId);
    await this.userRepo.remove(user);
    return { deleted: true };
  }
}

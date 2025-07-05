import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from '../user/entities/user.entity';
import { Tenant } from '../tenant/entities/tenant.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Tenant) private readonly tenantRepo: Repository<Tenant>,
    private readonly jwt: JwtService,
  ) {}

  async signUp(email: string, password: string, tenantName: string): Promise<{ token: string }> {
    const existing = await this.userRepo.findOne({ where: { email } });
    if (existing) throw new ConflictException('Email already exists');

    let tenant = await this.tenantRepo.findOne({ where: { name: tenantName } });
    if (!tenant) {
      tenant = this.tenantRepo.create({ name: tenantName });
      await this.tenantRepo.save(tenant);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({ email, passwordHash, role: UserRole.MANAGER, tenant, tenantId: tenant.id });
    await this.userRepo.save(user);

    const token = await this.jwt.signAsync({ sub: user.id, tenantId: tenant.id, role: user.role });
    return { token };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException();
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) throw new UnauthorizedException();
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const token = await this.jwt.signAsync({ sub: user.id, tenantId: user.tenantId, role: user.role });
    return { token };
  }
}

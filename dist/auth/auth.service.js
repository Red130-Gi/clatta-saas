"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("../user/entities/user.entity");
const tenant_entity_1 = require("../tenant/entities/tenant.entity");
let AuthService = class AuthService {
    userRepo;
    tenantRepo;
    jwt;
    constructor(userRepo, tenantRepo, jwt) {
        this.userRepo = userRepo;
        this.tenantRepo = tenantRepo;
        this.jwt = jwt;
    }
    async signUp(email, password, tenantName) {
        const existing = await this.userRepo.findOne({ where: { email } });
        if (existing)
            throw new common_1.ConflictException('Email already exists');
        let tenant = await this.tenantRepo.findOne({ where: { name: tenantName } });
        if (!tenant) {
            tenant = this.tenantRepo.create({ name: tenantName });
            await this.tenantRepo.save(tenant);
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const user = this.userRepo.create({ email, passwordHash, role: user_entity_1.UserRole.MANAGER, tenant, tenantId: tenant.id });
        await this.userRepo.save(user);
        const token = await this.jwt.signAsync({ sub: user.id, tenantId: tenant.id, role: user.role });
        return { token };
    }
    async validateUser(email, password) {
        const user = await this.userRepo.findOne({ where: { email } });
        if (!user)
            throw new common_1.UnauthorizedException();
        const match = await bcrypt.compare(password, user.passwordHash);
        if (!match)
            throw new common_1.UnauthorizedException();
        return user;
    }
    async login(email, password) {
        const user = await this.validateUser(email, password);
        const token = await this.jwt.signAsync({ sub: user.id, tenantId: user.tenantId, role: user.role });
        return { token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(tenant_entity_1.Tenant)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
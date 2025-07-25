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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UserService = class UserService {
    userRepo;
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async create(tenantId, dto) {
        const existing = await this.userRepo.findOne({ where: { email: dto.email, tenantId } });
        if (existing) {
            throw new common_1.BadRequestException('Email already exists for this tenant');
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
    async findAll(tenantId) {
        return this.userRepo.find({ where: { tenantId } });
    }
    async findOne(id, tenantId) {
        const user = await this.userRepo.findOne({ where: { id, tenantId } });
        if (!user)
            throw new common_1.NotFoundException();
        return user;
    }
    async update(id, tenantId, dto) {
        const user = await this.findOne(id, tenantId);
        if (dto.password) {
            dto = { ...dto, passwordHash: await bcrypt.hash(dto.password, 10) };
            delete dto.password;
        }
        Object.assign(user, dto);
        return this.userRepo.save(user);
    }
    async remove(id, tenantId) {
        const user = await this.findOne(id, tenantId);
        await this.userRepo.remove(user);
        return { deleted: true };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map
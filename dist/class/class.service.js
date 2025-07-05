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
exports.ClassService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const class_entity_1 = require("./entities/class.entity");
let ClassService = class ClassService {
    classRepo;
    constructor(classRepo) {
        this.classRepo = classRepo;
    }
    async create(tenantId, dto) {
        const exists = await this.classRepo.findOne({ where: { name: dto.name, tenantId } });
        if (exists) {
            throw new common_1.BadRequestException('Class name already exists for this tenant');
        }
        const entity = this.classRepo.create({ ...dto, tenantId });
        return this.classRepo.save(entity);
    }
    async findAll(tenantId) {
        return this.classRepo.find({ where: { tenantId } });
    }
    async findOne(id, tenantId) {
        const entity = await this.classRepo.findOne({ where: { id, tenantId } });
        if (!entity)
            throw new common_1.NotFoundException();
        return entity;
    }
    async update(id, tenantId, dto) {
        const entity = await this.findOne(id, tenantId);
        Object.assign(entity, dto);
        return this.classRepo.save(entity);
    }
    async remove(id, tenantId) {
        const entity = await this.findOne(id, tenantId);
        await this.classRepo.remove(entity);
        return { deleted: true };
    }
};
exports.ClassService = ClassService;
exports.ClassService = ClassService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(class_entity_1.SchoolClass)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClassService);
//# sourceMappingURL=class.service.js.map
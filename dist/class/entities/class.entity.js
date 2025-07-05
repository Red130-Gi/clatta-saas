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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolClass = void 0;
const typeorm_1 = require("typeorm");
const tenant_entity_1 = require("../../tenant/entities/tenant.entity");
let SchoolClass = class SchoolClass {
    id;
    name;
    tenant;
    tenantId;
};
exports.SchoolClass = SchoolClass;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SchoolClass.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SchoolClass.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tenant_entity_1.Tenant, (tenant) => tenant.id, { eager: false }),
    __metadata("design:type", tenant_entity_1.Tenant)
], SchoolClass.prototype, "tenant", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SchoolClass.prototype, "tenantId", void 0);
exports.SchoolClass = SchoolClass = __decorate([
    (0, typeorm_1.Index)(['name', 'tenantId'], { unique: true }),
    (0, typeorm_1.Entity)()
], SchoolClass);
//# sourceMappingURL=class.entity.js.map
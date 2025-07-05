"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEstablishmentDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_establishment_dto_1 = require("./create-establishment.dto");
class UpdateEstablishmentDto extends (0, mapped_types_1.PartialType)(create_establishment_dto_1.CreateEstablishmentDto) {
}
exports.UpdateEstablishmentDto = UpdateEstablishmentDto;
//# sourceMappingURL=update-establishment.dto.js.map
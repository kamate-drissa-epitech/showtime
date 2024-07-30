"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserdto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const CreateUser_dto_1 = require("./CreateUser.dto");
class UpdateUserdto extends (0, mapped_types_1.PartialType)(CreateUser_dto_1.CreateUserdto) {
}
exports.UpdateUserdto = UpdateUserdto;
//# sourceMappingURL=updateUser.dto.js.map
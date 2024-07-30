"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutModule = void 0;
const common_1 = require("@nestjs/common");
const logout_service_1 = require("./logout.service");
const logout_controller_1 = require("./logout.controller");
let LogoutModule = class LogoutModule {
};
exports.LogoutModule = LogoutModule;
exports.LogoutModule = LogoutModule = __decorate([
    (0, common_1.Module)({
        providers: [logout_service_1.LogoutService],
        controllers: [logout_controller_1.LogoutController],
    })
], LogoutModule);
//# sourceMappingURL=logout.module.js.map
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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const CreateUser_dto_1 = require("./dto/CreateUser.dto");
const user_service_1 = require("./user.service");
const registerUserDto_1 = require("../auth/register/dto/registerUserDto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async dgetUser(req, res) {
        return await this.userService.finAll(req, res);
    }
    showForm() { }
    async createUser(req, res, createUserdto) {
        return await this.userService.create(req, res, createUserdto);
    }
    async ufindOne(id) {
        const user = await this.userService.findOne(id);
        return user;
    }
    async updateUser(req, response, userId, updateUserdto) {
        return await this.userService.updateUser(req, response, userId, updateUserdto);
    }
    async deleteUser(response, userId) {
        return await this.userService.deleteUser(response, userId);
    }
    seachbar() { }
    async searchUsers(query) {
        return this.userService.searchUsers(query);
    }
    async showFindOne(id) {
        const user = await this.userService.findOne(id);
        return user;
    }
    async findOneUser(id) {
        const users = await this.userService.findOne(id);
        console.log(users);
        return { users: users };
    }
    async findOne(id) {
        const user = await this.userService.findOne(id);
        console.log(user);
        return user;
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('list'),
    (0, common_1.Render)('user/usersList'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "dgetUser", null);
__decorate([
    (0, common_1.Get)('/addUserForm'),
    (0, common_1.Render)('user/addUserform'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "showForm", null);
__decorate([
    (0, common_1.Post)('/addUser'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, CreateUser_dto_1.CreateUserdto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)('/updateUserForm/:id'),
    (0, common_1.Render)('user/updateUserForm'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "ufindOne", null);
__decorate([
    (0, common_1.Post)('update/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, registerUserDto_1.registerUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Post)('/delete/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Get)('/seach'),
    (0, common_1.Render)('user/seachBar'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "seachbar", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "searchUsers", null);
__decorate([
    (0, common_1.Get)('/showUser/:id'),
    (0, common_1.Render)('user/showUser'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "showFindOne", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, common_1.Render)('user/userDashbord'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOneUser", null);
__decorate([
    (0, common_1.Get)('show/:id'),
    (0, common_1.Render)('user/showUser'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map
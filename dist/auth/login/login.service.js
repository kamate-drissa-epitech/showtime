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
exports.LoginService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const User_schema_1 = require("../../schema/User.schema");
let LoginService = class LoginService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async login(req, res, payload) {
        const { email, password } = payload;
        const user = await this.userModel.findOne({ email: email });
        if (!user)
            return res.render('auth/loginForm', {
                error: 'User not found',
                email: payload.email,
            });
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch)
            return res.render('auth/loginForm', { error: 'Password not correct' });
        if (user && passwordMatch) {
            if (user.isAdmin === true) {
                res.cookie('userId', user._id.toString());
                return res.redirect('admin');
            }
            else {
                res.cookie('userId', user._id.toString());
                res.redirect('/');
            }
        }
    }
};
exports.LoginService = LoginService;
exports.LoginService = LoginService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(User_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LoginService);
//# sourceMappingURL=login.service.js.map
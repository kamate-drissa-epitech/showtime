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
exports.RegisterService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const mongoose_1 = require("@nestjs/mongoose");
const User_schema_1 = require("../../schema/User.schema");
const mongoose_2 = require("mongoose");
let RegisterService = class RegisterService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async register(res, payload) {
        const { email, password, password_confirm, name } = payload;
        if (password !== password_confirm) {
            return res.render('auth/registerForm', {
                error: "Passwords don't matched",
                name: payload.name,
                email: payload.email,
            });
        }
        const filterName = /^[a-zA-Z]+$/;
        if (!filterName.test(name)) {
            return res.render('auth/registerForm', {
                error: 'Your name must only contains letters',
                name: payload.name,
                email: payload.email,
            });
        }
        const filterEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!filterEmail.test(email)) {
            return res.render('auth/registerForm', {
                error: 'Your email must be valid',
                name: payload.name,
                email: payload.email,
            });
        }
        if (password.length < 6) {
            return res.render('auth/registerForm', {
                error: 'Password must be more than 6 characters',
                name: payload.name,
                email: payload.email,
            });
        }
        const user = await this.userModel.findOne({ email: email });
        if (user)
            return res.render('auth/registerForm', {
                error: 'Email already exists',
                name: payload.name,
                email: payload.email,
            });
        const salt = await bcrypt.genSalt();
        const password_hash = await bcrypt.hash(payload.password, salt);
        const userToRegister = new this.userModel({
            name: name,
            email: email,
            password: password_hash,
        }).save();
        console.log(userToRegister);
        return res.render('auth/loginForm', {
            success: 'Account created successfuly',
        });
    }
};
exports.RegisterService = RegisterService;
exports.RegisterService = RegisterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(User_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RegisterService);
//# sourceMappingURL=register.service.js.map
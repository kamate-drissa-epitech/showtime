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
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const User_schema_1 = require("../schema/User.schema");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async searchUsers(query) {
        const regex = new RegExp(query, 'i');
        return this.userModel
            .find({
            $or: [{ name: { $regex: regex } }, { email: { $regex: regex } }],
        })
            .exec();
    }
    async create(req, res, payload) {
        const { email, password, password_confirm, name, isAdmin } = payload;
        if (password !== password_confirm) {
            return res.render('user/updateUserForm', {
                error: "Passwords don't matched",
                name: payload.name,
                email: payload.email,
            });
        }
        const filterName = /^[a-zA-Z\s-. ']+$/;
        if (!filterName.test(name)) {
            return res.render('user/updateUserForm', {
                error: 'Your name must only contains letters',
                name: payload.name,
                email: payload.email,
            });
        }
        const filterEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!filterEmail.test(email)) {
            return res.render('user/updateUserForm', {
                error: 'Your email must be valid',
                name: payload.name,
                email: payload.email,
            });
        }
        if (password.length < 6) {
            return res.render('user/updateUserForm', {
                error: 'Password must be more than 6 characters',
                name: payload.name,
                email: payload.email,
            });
        }
        const user = await this.userModel.findOne({ email: email });
        if (user)
            return res.render('user/updateUserForm', {
                error: 'Email already exists',
                name: payload.name,
                email: payload.email,
            });
        const salt = await bcrypt.genSalt();
        const password_hash = await bcrypt.hash(payload.password, salt);
        const userToRegister = new this.userModel({
            name: name,
            email: email,
            isAdmin: isAdmin,
            password: password_hash,
        }).save();
        console.log(userToRegister);
        return res.render('user/updateUserForm', {
            success: 'Account created successfuly',
        });
    }
    async finAll(req, res) {
        const userId = req.cookies['userId'];
        const user = await this.userModel.findById(userId);
        if (!user) {
            return res.redirect('/login');
        }
        const allUsers = await this.userModel.find({}).lean();
        const { name, email } = user;
        return {
            name: name,
            email: email,
            allUsers: allUsers,
        };
    }
    async findOne(id) {
        return this.userModel.findById(id);
    }
    async deleteUser(res, userId) {
        const deletedUser = await this.userModel.findByIdAndDelete(userId);
        console.log(deletedUser);
        res.redirect('/user/list');
    }
    async updateUser(req, res, userId, updateUserdto) {
        const { email, password, password_confirm, name, isAdmin } = updateUserdto;
        if (password !== password_confirm) {
            return res.render('user/updateUserForm', {
                error: "Passwords don't matched",
                name: name,
                email: email,
            });
        }
        const filterName = /^[a-zA-Z\s-. ']+$/;
        if (!filterName.test(name)) {
            return res.render('user/updateUserForm', {
                error: 'Your name must only contains letters',
                name: name,
                email: email,
            });
        }
        const filterEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!filterEmail.test(email)) {
            return res.render('user/updateUserForm', {
                error: 'Your email must be valid',
                name: name,
                email: email,
            });
        }
        if (password.length < 6) {
            return res.render('user/updateUserForm', {
                error: 'Password must be more than 6 characters',
                name: name,
                email: email,
            });
        }
        const salt = await bcrypt.genSalt();
        const password_hash = await bcrypt.hash(password, salt);
        const userUpdated = await this.userModel.findByIdAndUpdate(userId, { name: name, email: email, isAdmin: isAdmin, password: password_hash }, { new: true });
        res.redirect('/user/list');
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(User_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map
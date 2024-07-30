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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const User_schema_1 = require("../../schema/User.schema");
const bcrypt = require("bcrypt");
let AdminService = class AdminService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async addUser(req, res) {
        const userId = req.cookies['userId'];
        const user = await this.userModel.findById(userId);
        if (!user) {
            return res.redirect('/login');
        }
        const { name, email } = user;
        return {
            name: name,
            email: email,
        };
    }
    async showAdminDash(req, res) {
        const userId = req.cookies['userId'];
        const user = await this.userModel.findById(userId);
        if (!user) {
            return res.redirect('/login');
        }
        const countUsers = await this.userModel.countDocuments();
        console.log(countUsers);
        const { name, email } = user;
        return {
            name: name,
            email: email,
            users: countUsers,
        };
    }
    async showEditProfilForm(req, res) {
        const userId = req.cookies['userId'];
        const user = await this.userModel.findById(userId);
        if (!user) {
            return res.redirect('/login');
        }
        const { name, email, password } = user;
        return {
            name: name,
            email: email,
            password: password,
        };
    }
    async editProfil(req, res, payload) {
        const userId = req.cookies['userId'];
        const user = await this.userModel.findById(userId);
        if (!user) {
            return res.redirect('login');
        }
        const { name, password, email, old_password, password_confirm } = payload;
        if (!(await bcrypt.compare(old_password, user.password))) {
            return res.render('dash/editProfilForm', {
                error: 'wrong old password',
            });
        }
        if (password !== password_confirm) {
            return res.render('dash/editProfilForm', {
                error: "Passwords don't matched",
            });
        }
        const filterName = /^[a-zA-Z]+$/;
        if (!filterName.test(name)) {
            return res.render('dash/editProfilForm', {
                error: 'Your name must contain characters',
            });
        }
        const filterEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!filterEmail.test(email)) {
            return res.render('dash/editProfilForm', {
                error: 'Your email must be valid',
            });
        }
        if (password.length < 6) {
            return res.render('dash/editProfilForm', {
                error: 'Password must be more than 6 characters',
            });
        }
        const updatedUser = await this.userModel.findByIdAndUpdate(userId, {
            name: name,
            email: email,
            password: await bcrypt.hash(password, await bcrypt.genSalt()),
        });
        res.render('dash/editProfilForm', {
            success: 'Profile update succesfully',
        });
    }
    async deleteProfilAdmin(req, res) {
        const userId = req.cookies['userId'];
        const user = await this.userModel.findById(userId);
        if (!user) {
            return res.redirect('login');
        }
        const userDeleted = await this.userModel.findByIdAndDelete(userId);
        console.log(userDeleted);
        res.redirect('register');
    }
    async uploadFile(req, res, file) {
        console.log(file);
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(User_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AdminService);
//# sourceMappingURL=admin.service.js.map
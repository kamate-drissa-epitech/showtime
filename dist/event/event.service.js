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
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const User_schema_1 = require("../schema/User.schema");
let EventService = class EventService {
    constructor(eventModel, userModel) {
        this.eventModel = eventModel;
        this.userModel = userModel;
    }
    async findAll() {
        const event = await this.eventModel.find({}).lean();
        return event;
    }
    async create(req, res, event, file) {
        const imagePath = file.path.split('/');
        imagePath.shift();
        const pathToStore = imagePath.join('/');
        const result = new this.eventModel({ ...event, image: '/' + pathToStore });
        result.save();
        res.render('addEvent', { success: 'Event create successfully' });
    }
    async doBooking(req, res, _id) {
        const userId = req.cookies['userId'];
        let connectedUser = null;
        if (userId) {
            connectedUser = await this.userModel.findById(userId);
        }
        if (!connectedUser) {
            return res.render('auth/loginForm', {
                error: 'Please login before book',
            });
        }
        return await this.eventModel.findById({ _id }).exec();
    }
    async finAllEvents(req, res) {
        const allEvents = await this.eventModel.find({}).lean();
        return { allEvents: allEvents };
    }
    async showUpdateForm(id) {
        return this.eventModel.findById(id);
    }
    async updateById(id, event) {
        return await this.eventModel.findByIdAndUpdate(id, event, {
            new: true,
        });
    }
    async deleteById(id) {
        return await this.eventModel.findByIdAndDelete(id);
    }
};
exports.EventService = EventService;
exports.EventService = EventService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Event.name)),
    __param(1, (0, mongoose_1.InjectModel)(User_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model, mongoose_2.default.Model])
], EventService);
//# sourceMappingURL=event.service.js.map
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
exports.EventController = void 0;
const common_1 = require("@nestjs/common");
const event_service_1 = require("./event.service");
const create_event_dto_1 = require("./dto/create-event.dto");
const update_event_dto_1 = require("./dto/update-event.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path = require("path");
let EventController = class EventController {
    constructor(eventService) {
        this.eventService = eventService;
    }
    async getAllEvent() {
        return this.eventService.findAll();
    }
    async Root() {
        return {};
    }
    async CreateEventDto(req, res, event, file) {
        return await this.eventService.create(req, res, event, file);
    }
    async showAllEvents(req, res) {
        const allEvent = await this.eventService.finAllEvents(req, res);
        return allEvent;
    }
    async getEvent(req, res, id) {
        return await this.eventService.doBooking(req, res, id);
    }
    async showUpdateForm(id) {
        const event = await this.eventService.showUpdateForm(id);
        return event;
    }
    async updateEvent(id, event) {
        console.log('Updated');
        return await this.eventService.updateById(id, event);
    }
};
exports.EventController = EventController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getAllEvent", null);
__decorate([
    (0, common_1.Get)('/addEvent'),
    (0, common_1.Render)('addEvent'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventController.prototype, "Root", null);
__decorate([
    (0, common_1.Post)('/addEvent'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './public/uploads',
            filename: (req, file, callback) => {
                const fileName = path
                    .parse(file.originalname)
                    .name.replace(/\s/g, '');
                const extension = path.parse(file.originalname).ext;
                callback(null, `${fileName}${extension}`);
            },
        }),
    })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_event_dto_1.CreateEventDto, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "CreateEventDto", null);
__decorate([
    (0, common_1.Get)('allEvents'),
    (0, common_1.Render)('allEvents'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "showAllEvents", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.Render)('detail'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getEvent", null);
__decorate([
    (0, common_1.Get)('/editEvent/:id'),
    (0, common_1.Render)('editEvent'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "showUpdateForm", null);
__decorate([
    (0, common_1.Post)('/editEvent/:id'),
    (0, common_1.Redirect)('/events/allEvents', 302),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_event_dto_1.UpdateEventDto]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "updateEvent", null);
exports.EventController = EventController = __decorate([
    (0, common_1.Controller)('event'),
    __metadata("design:paramtypes", [event_service_1.EventService])
], EventController);
//# sourceMappingURL=event.controller.js.map
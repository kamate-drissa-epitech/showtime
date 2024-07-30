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
exports.TicketService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const ticket_schema_1 = require("./schemas/ticket.schema");
const event_schema_1 = require("../event/schemas/event.schema");
const QRCode = require("qrcode");
let TicketService = class TicketService {
    constructor(ticketModel, eventModel) {
        this.ticketModel = ticketModel;
        this.eventModel = eventModel;
    }
    async create(eventId) {
        return await this.eventModel.findById(eventId);
    }
    async findTicketId(id) {
        const reponse = await this.ticketModel.findById(id);
        if (!reponse) {
            throw new common_1.NotFoundException('Ticket not found.');
        }
        return reponse;
    }
    async generateQrCode(id) {
        try {
            const qrCodeDataURL = await QRCode.toDataURL(`http://localhost:3000/event/${id}`).then();
            return qrCodeDataURL;
        }
        catch (error) {
            throw new Error('Failed to generate QR code.');
        }
    }
};
exports.TicketService = TicketService;
exports.TicketService = TicketService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(ticket_schema_1.Ticket.name)),
    __param(1, (0, mongoose_1.InjectModel)(event_schema_1.Event.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], TicketService);
//# sourceMappingURL=ticket.service.js.map
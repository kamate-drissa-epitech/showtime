"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModule = void 0;
const common_1 = require("@nestjs/common");
const event_controller_1 = require("./event.controller");
const event_service_1 = require("./event.service");
const mongoose_1 = require("@nestjs/mongoose");
const event_schema_1 = require("./schemas/event.schema");
const User_schema_1 = require("../schema/User.schema");
let EventModule = class EventModule {
};
exports.EventModule = EventModule;
exports.EventModule = EventModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: event_schema_1.Event.name, schema: event_schema_1.EventSchema },
                {
                    name: User_schema_1.User.name,
                    schema: User_schema_1.UserSchema,
                },
            ]),
        ],
        controllers: [event_controller_1.EventController],
        providers: [event_service_1.EventService],
        exports: [event_service_1.EventService],
    })
], EventModule);
//# sourceMappingURL=event.module.js.map
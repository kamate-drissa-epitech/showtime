import { Request, Response } from 'express';
import { User } from './schema/User.schema';
import { Model } from 'mongoose';
import { EventService } from './event/event.service';
export declare class AppService {
    private userModel;
    private eventService;
    constructor(userModel: Model<User>, eventService: EventService);
    index(req: Request, res: Response): Promise<{
        user: import("mongoose").Document<unknown, {}, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        };
        events: Event[];
    }>;
    getEvent(): Promise<Event[]>;
}

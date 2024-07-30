import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Request, Response } from 'express';
export declare class EventController {
    private eventService;
    constructor(eventService: EventService);
    getAllEvent(): Promise<Event[]>;
    Root(): Promise<{}>;
    CreateEventDto(req: Request, res: Response, event: CreateEventDto, file: Express.Multer.File): Promise<void>;
    showAllEvents(req: Request, res: Response): Promise<{
        allEvents: (import("mongoose").FlattenMaps<Event> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    getEvent(req: Request, res: Response, id: string): Promise<void | (import("mongoose").Document<unknown, {}, Event> & Event & {
        _id: import("mongoose").Types.ObjectId;
    })>;
    showUpdateForm(id: string): Promise<import("mongoose").Document<unknown, {}, Event> & Event & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateEvent(id: string, event: UpdateEventDto): Promise<Event>;
}

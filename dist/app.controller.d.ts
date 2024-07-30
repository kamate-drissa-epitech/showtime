import { AppService } from './app.service';
import { Request, Response } from 'express';
import { EventService } from './event/event.service';
export declare class AppController {
    private readonly appService;
    private readonly eventService;
    constructor(appService: AppService, eventService: EventService);
    index(req: Request, res: Response): Promise<void>;
}

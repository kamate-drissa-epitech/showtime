import mongoose from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Request, Response } from 'express';
import { User } from 'src/schema/User.schema';
export declare class EventService {
    private eventModel;
    private userModel;
    constructor(eventModel: mongoose.Model<Event>, userModel: mongoose.Model<User>);
    findAll(): Promise<Event[]>;
    create(req: Request, res: Response, event: CreateEventDto, file: Express.Multer.File): Promise<void>;
    doBooking(req: Request, res: Response, _id: string): Promise<void | (mongoose.Document<unknown, {}, Event> & Event & {
        _id: mongoose.Types.ObjectId;
    })>;
    finAllEvents(req: Request, res: Response): Promise<{
        allEvents: (mongoose.FlattenMaps<Event> & {
            _id: mongoose.Types.ObjectId;
        })[];
    }>;
    showUpdateForm(id: string): Promise<mongoose.Document<unknown, {}, Event> & Event & {
        _id: mongoose.Types.ObjectId;
    }>;
    updateById(id: string, event: UpdateEventDto): Promise<Event>;
    deleteById(id: string): Promise<Event>;
}

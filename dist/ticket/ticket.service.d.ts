import { Model } from 'mongoose';
import { Ticket } from './schemas/ticket.schema';
import { Event } from '../event/schemas/event.schema';
export declare class TicketService {
    private ticketModel;
    private eventModel;
    constructor(ticketModel: Model<Ticket>, eventModel: Model<Event>);
    create(eventId: string): Promise<import("mongoose").Document<unknown, {}, Event> & Event & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findTicketId(id: string): Promise<Ticket>;
    generateQrCode(id: string): Promise<string>;
}

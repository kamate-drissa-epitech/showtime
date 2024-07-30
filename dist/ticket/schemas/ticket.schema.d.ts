import mongoose from 'mongoose';
export declare class Ticket {
    quantity: number;
    eventId: Event;
    TicketNumber: number;
    title?: string;
    description?: string;
    genre?: string;
    eventStart?: string;
    eventEnd?: string;
    location?: string;
    totalPlace?: number;
    availablePlace?: number;
    price?: number;
    artist?: string;
    image?: string;
    userId?: number;
}
export declare const TicketSchema: mongoose.Schema<Ticket, mongoose.Model<Ticket, any, any, any, mongoose.Document<unknown, any, Ticket> & Ticket & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Ticket, mongoose.Document<unknown, {}, mongoose.FlatRecord<Ticket>> & mongoose.FlatRecord<Ticket> & {
    _id: mongoose.Types.ObjectId;
}>;

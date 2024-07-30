import { TicketService } from './ticket.service';
import { Response } from 'express';
export declare class TicketController {
    private ticketService;
    constructor(ticketService: TicketService);
    showTicket(payload: any, res: Response, eventId: string): Promise<import("mongoose").Document<unknown, {}, import("../event/schemas/event.schema").Event> & import("../event/schemas/event.schema").Event & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getTicket(id: string): Promise<{
        reponse: import("./schemas/ticket.schema").Ticket;
    }>;
    generateQrCode(id: string): Promise<{
        qrCodeDataURL: string;
    }>;
}

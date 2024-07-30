import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket } from './schemas/ticket.schema';
import { Event } from '../event/schemas/event.schema';
import { CreateTicketDto } from './dto/create-ticket.dto';
import * as QRCode from 'qrcode';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<Ticket>,
    @InjectModel(Event.name) private eventModel: Model<Event>,
  ) {}

  async create(eventId: string) {
    return await this.eventModel.findById(eventId);
    // console.log(ticket.quantity);
    // if (!event) {
    //   throw new NotFoundException('Event not found');
    // }

    // const createdTicket = new this.ticketModel({
    //   ...ticket,
    //   title: event.title,
    //   description: event.description,
    //   genre: event.genre,
    //   eventStart: event.eventStart,
    //   eventEnd: event.eventEnd,
    //   location: event.location,
    //   totalPlace: event.totalPlace - ticket.quantity,
    //   availablePlace: event.bookedPlace,
    //   image: event.image,
    //   userId: event.userId,
    // });

    // return createdTicket.save();
  }

  async findTicketId(id: string): Promise<Ticket> {
    const reponse = await this.ticketModel.findById(id);
    if (!reponse) {
      throw new NotFoundException('Ticket not found.');
    }
    return reponse;
  }

//   async generate(id: string){
//     const code = await QRCode.toDataURL(`http://localhost:3000/event/${id}`).then()
//     console.log(code);  
//     return code
//   }

async generateQrCode(id: string): Promise<string> {
    try {
      const qrCodeDataURL = await QRCode.toDataURL(`http://localhost:3000/event/${id}`).then();
      return qrCodeDataURL;
    } catch (error) {
      throw new Error('Failed to generate QR code.');
    }
  }
}

import { TicketService } from './ticket.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Redirect,
  Res,
  Query
} from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Response } from 'express';

@Controller('ticket')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  // @Post('create')
  // @Redirect('/ticket/', 302)
  // async create(
  //   @Body()
  //   ticket: CreateTicketDto,
  // ) {
  //   return this.ticketService.create(ticket);
  // }

  @Post('create/:eventId')
  @Render('ticket')
  async showTicket(
    @Body() payload,
    @Res() res: Response,
    @Param('eventId') eventId: string,
  ) {
    const event = await this.ticketService.create(eventId);
    console.log(event);
    return event;
  }

  @Get(':id')
  @Render('ticket')
  async getTicket(
    @Param('id')
    id: string,
  ) {
    const reponse = await this.ticketService.findTicketId(id);
    return { reponse };
  }

//   @Get(':id')
//   @Render('ticket')
//   async getqr(
//     @Param('id')
//     id: string
//   ){
//     const code = await this.ticketService.generate(id)
//     console.log(code);
//     return {code}
//   }

@Get(':id')
@Render('ticket')
async generateQrCode(@Query('id') id: string) {
    const qrCodeDataURL = await this.ticketService.generateQrCode(id);
    return {qrCodeDataURL}
}
}

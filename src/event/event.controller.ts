import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Redirect,
  Req,
  Res,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { EventService } from './event.service';
// import { Event } from './Schemas/event.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Get()
  async getAllEvent() {
    return this.eventService.findAll();
  }

  // @Get('/ticket/:id')
  // @Render('ticket')
  // async getTicket(
  //   @Param('id')
  //   id: string
  // ) {
  //   const reponse =  await this.eventService.findById(id);
  //   return {reponse}
  // }

  @Get('/addEvent')
  @Render('addEvent')
  async Root() {
    return {};
  }

  @Post('/addEvent')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, callback) => {
          const fileName = path
            .parse(file.originalname)
            .name.replace(/\s/g, '');
          const extension = path.parse(file.originalname).ext;
          callback(null, `${fileName}${extension}`);
        },
      }),
    }),
  )
  async CreateEventDto(
    @Req() req: Request,
    @Res() res: Response,
    @Body()
    event: CreateEventDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.eventService.create(req, res, event, file);
    // if (evenCreated) {
    //   return res.render('addEvent', { success: 'Event created successfully' });
    // } else {
    //   res.render('addEvent', { error: 'Impossible to create such event' });
    // }
  }

  @Get('allEvents')
  @Render('allEvents')
  async showAllEvents(@Req() req: Request, @Res() res: Response) {
    const allEvent = await this.eventService.finAllEvents(req, res);
    return allEvent;
  }

  @Get(':id')
  @Render('detail')
  async getEvent(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id')
    id: string,
  ) {
    return await this.eventService.doBooking(req, res, id);
  }

  // @Get('/editEvent/:id')
  // @Render('editEvent')
  // async Edit(
  //   @Param('id')
  //   id: string,
  // ) {
  //   const reponse = await this.eventService.findById(id);
  //   return { reponse };
  // }

  @Get('/editEvent/:id')
  @Render('editEvent')
  async showUpdateForm(
    @Param('id')
    id: string,
  ) {
    const event = await this.eventService.showUpdateForm(id);
    return event;
  }

  @Post('/editEvent/:id')
  @Redirect('/events/allEvents', 302)
  async updateEvent(
    @Param('id')
    id: string,
    @Body()
    event: UpdateEventDto,
  ) {
    console.log('Updated');
    return await this.eventService.updateById(id, event);
  }

  // @Post(':id')
  // @Redirect('/', 302)
  // async deleteEvent(
  //   @Param('id')
  //   id: string,
  // ) {
  //   return this.eventService.deleteById(id);
  // }
}

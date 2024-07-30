import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { EventService } from './event/event.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly eventService: EventService,
  ) {}

  @Get('/')
  async index(@Req() req: Request, @Res() res: Response) {
    const { user, events } = await this.appService.index(req, res);
    res.render('index', { events: events, user: user });
  }

  // async root() {
  //   const data = await this.appService.getEvent();
  //   return { data };
  // }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response } from 'express';
import { User } from './schema/User.schema';
import { Model } from 'mongoose';
import { EventService } from './event/event.service';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private eventService: EventService,
  ) {}

  async index(req: Request, res: Response) {
    const userId = req.cookies['userId'];
    // Fetch all events from event service
    const events = await this.eventService.findAll();
    const user = await this.userModel.findById(userId);
    return { user: user, events: events };
    // if (!user) {
    //   return res.redirect('login');
    // } else {
    //   return res.render('index');
    // }
  }
  async getEvent() {
    return this.eventService.findAll();
  }

  // async getEventById(id) {
  //   return this.eventService.findById(id);
  // }
}

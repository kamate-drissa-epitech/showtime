import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { User } from 'src/schema/User.schema';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name)
    private eventModel: mongoose.Model<Event>,
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async findAll(): Promise<Event[]> {
    const event = await this.eventModel.find({}).lean();
    return event;
  }

  async create(
    req: Request,
    res: Response,
    event: CreateEventDto,
    file: Express.Multer.File,
  ) {
    const imagePath = file.path.split('/');
    imagePath.shift();
    const pathToStore = imagePath.join('/');

    const result = new this.eventModel({ ...event, image: '/' + pathToStore });
    result.save();
    res.render('addEvent', { success: 'Event create successfully' });
  }

  async doBooking(req: Request, res: Response, _id: string) {
    const userId = req.cookies['userId'];
    let connectedUser = null;
    if (userId) {
      connectedUser = await this.userModel.findById(userId);
    }
    if (!connectedUser) {
      return res.render('auth/loginForm', {
        error: 'Please login before book',
      });
    }
    return await this.eventModel.findById({ _id }).exec();
  }

  async finAllEvents(req: Request, res: Response) {
    const allEvents = await this.eventModel.find({}).lean();
    return { allEvents: allEvents };
  }

  async showUpdateForm(id: string) {
    return this.eventModel.findById(id);
  }

  async updateById(id: string, event: UpdateEventDto): Promise<Event> {
    return await this.eventModel.findByIdAndUpdate(id, event, {
      new: true,
    });
  }

  async deleteById(id: string): Promise<Event> {
    return await this.eventModel.findByIdAndDelete(id);
  }
}

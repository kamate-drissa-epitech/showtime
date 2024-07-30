import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
// import { Event } from 'src/event/Schemas/event.schema';
// import {  Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Ticket {
  @Prop({ required: true })
  quantity: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Event' })
  eventId: Event;

  @Prop()
  TicketNumber: number;

  @Prop()
  title?: string;

  @Prop()
  description?: string;

  @Prop()
  genre?: string;

  @Prop()
  eventStart?: string;

  @Prop()
  eventEnd?: string;

  @Prop()
  location?: string;

  @Prop()
  totalPlace?: number;

  @Prop()
  availablePlace?: number;

  @Prop()
  price?: number;

  @Prop()
  artist?: string;

  @Prop()
  image?: string;

  @Prop()
  userId?: number;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);

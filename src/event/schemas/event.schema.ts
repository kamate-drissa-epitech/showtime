import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Event {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  genre: string;

  @Prop()
  eventStart: string;

  @Prop()
  eventEnd: string;

  @Prop()
  location: string;

  @Prop()
  totalPlace: number;

  @Prop()
  bookedPlace: number;

  @Prop()
  price: number;

  @Prop({ required: false })
  artist?: string;

  @Prop({ required: false })
  image?: string;

  @Prop({ required: false })
  startTime: string;

  @Prop({ required: false })
  endTime: string;

  @Prop()
  userId?: number;
}

export const EventSchema = SchemaFactory.createForClass(Event);

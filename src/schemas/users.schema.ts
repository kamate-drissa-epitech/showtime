import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  email: string;

  @Prop({ required: false })
  password: string;

  @Prop({ required: false })
  isAdmin: number;

  @Prop({ required: false })
  favorit: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

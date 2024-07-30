import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 0 })
  isAdmin?: boolean;

  @Prop()
  favorites?: [];
}

export const UserSchema = SchemaFactory.createForClass(User);

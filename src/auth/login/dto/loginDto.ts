import { Prop } from '@nestjs/mongoose';

export class LoginDto {
  @Prop()
  email: string;

  @Prop()
  password: string;
}

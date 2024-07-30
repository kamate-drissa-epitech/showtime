import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from './dto/loginDto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/schema/User.schema';
import { Response, Request } from 'express';
import { error } from 'console';

@Injectable()
export class LoginService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async login(req: Request, res: Response, payload: LoginDto) {
    const { email, password } = payload;
    const user = await this.userModel.findOne({ email: email });
    if (!user)
      return res.render('auth/loginForm', {
        error: 'User not found',
        email: payload.email,
      });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.render('auth/loginForm', { error: 'Password not correct' });

    // If user found set cookie and redirect to a right place
    if (user && passwordMatch) {
      if (user.isAdmin === true) {
        res.cookie('userId', user._id.toString());
        return res.redirect('admin');
      } else {
        res.cookie('userId', user._id.toString());
        res.redirect('/');
      }
    }
  }
}

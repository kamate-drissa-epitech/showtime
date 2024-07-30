import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { registerUserDto } from './dto/registerUserDto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schema/User.schema';
import { Model } from 'mongoose';
import { Response } from 'express';
import { use } from 'passport';

@Injectable()
export class RegisterService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async register(res: Response, payload: registerUserDto) {
    //CREATE FAKE ADMIN
    // const salte = await bcrypt.genSalt();
    // new this.userModel({
    //   name: 'kamate',
    //   email: 'kamate@gmail.com',
    //   password: await bcrypt.hash('kamate', salte),
    //   isAdmin: 1,
    // }).save();
    // return res.redirect('login')
    const { email, password, password_confirm, name } = payload;
    if (password !== password_confirm) {
      return res.render('auth/registerForm', {
        error: "Passwords don't matched",
        name: payload.name,
        email: payload.email,
      });
    }
    const filterName = /^[a-zA-Z]+$/;
    if (!filterName.test(name)) {
      return res.render('auth/registerForm', {
        error: 'Your name must only contains letters',
        name: payload.name,
        email: payload.email,
      });
    }
    const filterEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!filterEmail.test(email)) {
      return res.render('auth/registerForm', {
        error: 'Your email must be valid',
        name: payload.name,
        email: payload.email,
      });
    }
    if (password.length < 6) {
      return res.render('auth/registerForm', {
        error: 'Password must be more than 6 characters',
        name: payload.name,
        email: payload.email,
      });
    }

    const user = await this.userModel.findOne({ email: email });
    if (user)
      return res.render('auth/registerForm', {
        error: 'Email already exists',
        name: payload.name,
        email: payload.email,
      });

    const salt = await bcrypt.genSalt();
    const password_hash = await bcrypt.hash(payload.password, salt);
    const userToRegister = new this.userModel({
      name: name,
      email: email,
      password: password_hash,
    }).save();
    console.log(userToRegister);

    return res.render('auth/loginForm', {
      success: 'Account created successfuly',
    });
  }

  // @UsePipes(new ValidationPipe())
  // async registerUser(res: Response, payload: registerUserDto) {
  //
  //   // const salt = await bcrypt.genSalt();
  //   // const password_hash = await bcrypt.hash(payload.password, salt);
  //   // if (payload.password !== payload.password_confirm) {
  //   //   return res.redirect("register/Password don't match");
  //   // }
  //   // const userToRegister = new this.userModel({
  //   //   ...payload,
  //   //   password: password_hash,
  //   // });
  //   // return userToRegister;
  // }
}

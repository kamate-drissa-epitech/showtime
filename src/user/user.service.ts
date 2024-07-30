import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { CreateUserdto } from './dto/CreateUser.dto';
import { UpdateUserdto } from './dto/updateUser.dto';
import { User } from 'src/schema/User.schema';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { registerUserDto } from 'src/auth/register/dto/registerUserDto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async searchUsers(query: string) {
    const regex = new RegExp(query, 'i'); // 'i' pour insensible à la casseUser
    return this.userModel
      .find({
        $or: [{ name: { $regex: regex } }, { email: { $regex: regex } }],
      })
      .exec();
  }

  async create(req: Request, res: Response, payload: any) {
    const { email, password, password_confirm, name, isAdmin } = payload;
    if (password !== password_confirm) {
      return res.render('user/updateUserForm', {
        error: "Passwords don't matched",
        name: payload.name,
        email: payload.email,
      });
    }
    const filterName = /^[a-zA-Z\s-. ']+$/;
    if (!filterName.test(name)) {
      return res.render('user/updateUserForm', {
        error: 'Your name must only contains letters',
        name: payload.name,
        email: payload.email,
      });
    }
    const filterEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!filterEmail.test(email)) {
      return res.render('user/updateUserForm', {
        error: 'Your email must be valid',
        name: payload.name,
        email: payload.email,
      });
    }
    if (password.length < 6) {
      return res.render('user/updateUserForm', {
        error: 'Password must be more than 6 characters',
        name: payload.name,
        email: payload.email,
      });
    }
    const user = await this.userModel.findOne({ email: email });
    if (user)
      return res.render('user/updateUserForm', {
        error: 'Email already exists',
        name: payload.name,
        email: payload.email,
      });
    // HASH PASSWORD
    const salt = await bcrypt.genSalt();
    const password_hash = await bcrypt.hash(payload.password, salt);
    const userToRegister = new this.userModel({
      name: name,
      email: email,
      isAdmin: isAdmin,
      password: password_hash,
    }).save();
    console.log(userToRegister);

    return res.render('user/updateUserForm', {
      success: 'Account created successfuly',
    });
    // const createUser = new this.userModel(CreateUserdto);
    // return createUser.save();
  }

  async finAll(req: Request, res: Response) {
    const userId = req.cookies['userId'];
    const user = await this.userModel.findById(userId);
    if (!user) {
      return res.redirect('/login');
    }
    const allUsers = await this.userModel.find({}).lean();
    const { name, email } = user;
    return {
      name: name,
      email: email,
      allUsers: allUsers,
    };
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id);
  }

  async deleteUser(res: Response, userId: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);
    console.log(deletedUser);
    res.redirect('/user/list');
  }

  async updateUser(
    req: Request,
    res: Response,
    userId: string,
    updateUserdto: registerUserDto,
  ) {
    const { email, password, password_confirm, name, isAdmin } = updateUserdto;
    if (password !== password_confirm) {
      return res.render('user/updateUserForm', {
        error: "Passwords don't matched",
        name: name,
        email: email,
      });
    }
    const filterName = /^[a-zA-Z\s-. ']+$/;
    if (!filterName.test(name)) {
      return res.render('user/updateUserForm', {
        error: 'Your name must only contains letters',
        name: name,
        email: email,
      });
    }
    const filterEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!filterEmail.test(email)) {
      return res.render('user/updateUserForm', {
        error: 'Your email must be valid',
        name: name,
        email: email,
      });
    }
    if (password.length < 6) {
      return res.render('user/updateUserForm', {
        error: 'Password must be more than 6 characters',
        name: name,
        email: email,
      });
    }
    // HASH PASSWORD
    const salt = await bcrypt.genSalt();
    const password_hash = await bcrypt.hash(password, salt);

    // const userToRegister = new this.userModel({
    //   name: name,
    //   email: email,
    //   isAdmin: isAdmin,
    //   password: password_hash,
    // }).save();

    const userUpdated = await this.userModel.findByIdAndUpdate(
      userId,
      { name: name, email: email, isAdmin: isAdmin, password: password_hash },
      { new: true },
    );

    res.redirect('/user/list');

    // return res.render('user/updateUserForm', {
    //   success: 'Account created successfuly',
    // });
  }

  // return existingStudent;
}

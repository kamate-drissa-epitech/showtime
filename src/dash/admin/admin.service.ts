import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { User } from 'src/schema/User.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async addUser(req: Request, res: Response) {
    const userId = req.cookies['userId'];
    const user = await this.userModel.findById(userId);
    if (!user) {
      return res.redirect('/login');
    }
    const { name, email } = user;
    return {
      name: name,
      email: email,
    };
  }

  async showAdminDash(req: Request, res: Response) {
    const userId = req.cookies['userId'];
    const user = await this.userModel.findById(userId);

    if (!user) {
      return res.redirect('/login');
    }
    const countUsers = await this.userModel.countDocuments();

    console.log(countUsers);

    const { name, email } = user;
    return {
      name: name,
      email: email,
      users: countUsers,
    };
  }

  async showEditProfilForm(req: Request, res: Response) {
    const userId = req.cookies['userId'];
    const user = await this.userModel.findById(userId);

    // Redirect if user if not connected
    if (!user) {
      return res.redirect('/login');
    }
    const { name, email, password } = user;
    return {
      name: name,
      email: email,
      password: password,
    };
  }

  async editProfil(req: Request, res: Response, payload: any) {
    const userId = req.cookies['userId'];
    const user = await this.userModel.findById(userId);
    if (!user) {
      return res.redirect('login');
    }
    const { name, password, email, old_password, password_confirm } = payload;

    if (!(await bcrypt.compare(old_password, user.password))) {
      return res.render('dash/editProfilForm', {
        error: 'wrong old password',
      });
    }

    if (password !== password_confirm) {
      return res.render('dash/editProfilForm', {
        error: "Passwords don't matched",
      });
    }
    const filterName = /^[a-zA-Z]+$/;
    if (!filterName.test(name)) {
      return res.render('dash/editProfilForm', {
        error: 'Your name must contain characters',
      });
    }

    const filterEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!filterEmail.test(email)) {
      return res.render('dash/editProfilForm', {
        error: 'Your email must be valid',
      });
    }
    if (password.length < 6) {
      return res.render('dash/editProfilForm', {
        error: 'Password must be more than 6 characters',
      });
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(userId, {
      name: name,
      email: email,
      password: await bcrypt.hash(password, await bcrypt.genSalt()),
    });
    res.render('dash/editProfilForm', {
      success: 'Profile update succesfully',
    });
  }

  async deleteProfilAdmin(req: Request, res: Response) {
    const userId = req.cookies['userId'];
    const user = await this.userModel.findById(userId);
    if (!user) {
      return res.redirect('login');
    }
    const userDeleted = await this.userModel.findByIdAndDelete(userId);
    console.log(userDeleted);
    res.redirect('register');
  }

  async uploadFile(req: Request, res: Response, file: Express.Multer.File) {
    console.log(file);
    // return res.status(HttpStatus.OK).json({
    //   success: true,
    //   data: file.path,
    // });
  }
}

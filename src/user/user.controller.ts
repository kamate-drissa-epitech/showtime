import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Res,
  Render,
  Query,
  Req,
} from '@nestjs/common';
import { CreateUserdto } from './dto/CreateUser.dto';
import { UserService } from './user.service';
import { UpdateUserdto } from './dto/updateUser.dto';
import { Request, Response } from 'express';
import { registerUserDto } from 'src/auth/register/dto/registerUserDto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('list')
  @Render('user/usersList')
  async dgetUser(@Req() req: Request, @Res() res: Response) {
    return await this.userService.finAll(req, res);
  }

  @Get('/addUserForm')
  @Render('user/addUserform')
  showForm() {}

  @Post('/addUser')
  async createUser(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createUserdto: CreateUserdto,
  ) {
    return await this.userService.create(req, res, createUserdto);
  }

  @Get('/updateUserForm/:id')
  @Render('user/updateUserForm')
  async ufindOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    return user;
  }

  @Post('update/:id')
  async updateUser(
    @Req() req: Request,
    @Res() response: Response,
    @Param('id') userId: string,
    @Body() updateUserdto: registerUserDto,
  ) {
    return await this.userService.updateUser(
      req,
      response,
      userId,
      updateUserdto,
    );
  }

  @Post('/delete/:id')
  async deleteUser(@Res() response: Response, @Param('id') userId: string) {
    return await this.userService.deleteUser(response, userId);
  }

  @Get('/seach')
  @Render('user/seachBar')
  seachbar() {}

  @Get('search')
  async searchUsers(@Query('q') query: string) {
    return this.userService.searchUsers(query);
  }

  // @Get('/updateUserForm1/:id')
  // @Render('user/updateUserProfile')
  // async ufindOne1(@Param('id') id: string) {
  //   const user = await this.userService.findOne(id);
  //   return user;
  // }

  @Get('/showUser/:id')
  @Render('user/showUser')
  async showFindOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    return user;
  }

  // @Get('/updateUserForm/:id')
  // @Render('user/updateUserForm')
  // async ufindOne(@Param('id') id: string) {
  //   const rep = await this.userService.findOne(id);
  //   console.log(rep);
  //   return rep;
  // }

  // @Get('delete1/:id')
  // async deleteUser1(@Res() response, @Param('id') userId: string) {
  //   await this.userService.deleteUser(userId);
  //   return response.redirect('/user/addUserForm');
  // }

  @Get('/:id')
  @Render('user/userDashbord')
  async findOneUser(@Param('id') id: string) {
    const users = await this.userService.findOne(id);
    console.log(users);
    return { users: users };
  }
  // @Get()
  // @Render('user/usersList')
  // async getUser() {
  //   const users = await this.userService.finAll();
  //   return { users };
  // }
  @Get('show/:id')
  @Render('user/showUser')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    console.log(user);
    return user;
  }

  // @Get('update/list')
  // @Render('user/usersList')
  // async upgetUser() {
  //   const users = await this.userService.finAll();
  //   return { users };
  // }

  // @Post('update1/:id')
  // // @Render('user/userDashbord')
  // async updateUser1(
  //   @Res() response,
  //   @Param('id') userId: string,
  //   @Body() updateUserdto: UpdateUserdto,
  // ) {
  //   await this.userService.updateUser(userId, updateUserdto);
  //   return response.redirect('/');
  // }
}

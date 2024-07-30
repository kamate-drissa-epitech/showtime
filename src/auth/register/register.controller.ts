import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Res,
} from '@nestjs/common';
import { registerUserDto } from './dto/registerUserDto';
import { RegisterService } from './register.service';
import { Response } from 'express';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  // @Post()
  // async registerUser(@Res() res: Response, @Body() payload: registerUserDto) {
  //   return this.registerService.registerUser(res, payload);
  // }

  @Post()
  async register(@Res() res: Response, @Body() payload: registerUserDto) {
    return this.registerService.register(res, payload);
  }

  @Get()
  @Render('auth/registerForm')
  showRegisterForm(@Param('error') error: string) {
    return { error: error };
  }
}

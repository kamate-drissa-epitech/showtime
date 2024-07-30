import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/loginDto';
import { Request, Response } from 'express';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(
    @Req() req: Request,
    @Res() res: Response,
    @Body() payload: LoginDto,
  ) {
    return this.loginService.login(req, res, payload);
  }

  @Get()
  @Render('auth/loginForm')
  showLoginForm(@Param('error') error: string) {
    return { error: error };
  }
}

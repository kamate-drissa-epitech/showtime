import { Controller, Post, Req, Res } from '@nestjs/common';
import { LogoutService } from './logout.service';
import { Request, Response } from 'express';

@Controller('logout')
export class LogoutController {
  constructor(private readonly logoutService: LogoutService) {}
  @Post()
  logout(@Req() req: Request, @Res() res: Response) {
    return this.logoutService.logout(req, res);
  }
}

import { Injectable, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LogoutService {
  logout(req: Request, res: Response) {
    res.clearCookie('userId');
    return res.redirect('login');
  }
}

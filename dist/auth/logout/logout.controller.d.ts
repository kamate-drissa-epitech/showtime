import { LogoutService } from './logout.service';
import { Request, Response } from 'express';
export declare class LogoutController {
    private readonly logoutService;
    constructor(logoutService: LogoutService);
    logout(req: Request, res: Response): void;
}

import { LoginService } from './login.service';
import { LoginDto } from './dto/loginDto';
import { Request, Response } from 'express';
export declare class LoginController {
    private readonly loginService;
    constructor(loginService: LoginService);
    login(req: Request, res: Response, payload: LoginDto): Promise<void>;
    showLoginForm(error: string): {
        error: string;
    };
}

import { registerUserDto } from './dto/registerUserDto';
import { RegisterService } from './register.service';
import { Response } from 'express';
export declare class RegisterController {
    private readonly registerService;
    constructor(registerService: RegisterService);
    register(res: Response, payload: registerUserDto): Promise<void>;
    showRegisterForm(error: string): {
        error: string;
    };
}

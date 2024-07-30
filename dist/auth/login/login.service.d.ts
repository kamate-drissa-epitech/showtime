import { Model } from 'mongoose';
import { LoginDto } from './dto/loginDto';
import { User } from 'src/schema/User.schema';
import { Response, Request } from 'express';
export declare class LoginService {
    private userModel;
    constructor(userModel: Model<User>);
    login(req: Request, res: Response, payload: LoginDto): Promise<void>;
}

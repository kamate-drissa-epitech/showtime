import { registerUserDto } from './dto/registerUserDto';
import { User } from 'src/schema/User.schema';
import { Model } from 'mongoose';
import { Response } from 'express';
export declare class RegisterService {
    private userModel;
    constructor(userModel: Model<User>);
    register(res: Response, payload: registerUserDto): Promise<void>;
}

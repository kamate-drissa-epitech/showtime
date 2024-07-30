import { Model } from 'mongoose';
import { User } from 'src/schema/User.schema';
import { Request, Response } from 'express';
import { registerUserDto } from 'src/auth/register/dto/registerUserDto';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    searchUsers(query: string): Promise<(import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    create(req: Request, res: Response, payload: any): Promise<void>;
    finAll(req: Request, res: Response): Promise<void | {
        name: string;
        email: string;
        allUsers: (import("mongoose").FlattenMaps<User> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    findOne(id: string): Promise<User | null>;
    deleteUser(res: Response, userId: string): Promise<void>;
    updateUser(req: Request, res: Response, userId: string, updateUserdto: registerUserDto): Promise<void>;
}

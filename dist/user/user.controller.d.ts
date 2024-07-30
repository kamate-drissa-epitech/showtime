import { CreateUserdto } from './dto/CreateUser.dto';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { registerUserDto } from 'src/auth/register/dto/registerUserDto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    dgetUser(req: Request, res: Response): Promise<void | {
        name: string;
        email: string;
        allUsers: (import("mongoose").FlattenMaps<import("../schema/User.schema").User> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    showForm(): void;
    createUser(req: Request, res: Response, createUserdto: CreateUserdto): Promise<void>;
    ufindOne(id: string): Promise<import("../schema/User.schema").User>;
    updateUser(req: Request, response: Response, userId: string, updateUserdto: registerUserDto): Promise<void>;
    deleteUser(response: Response, userId: string): Promise<void>;
    seachbar(): void;
    searchUsers(query: string): Promise<(import("mongoose").Document<unknown, {}, import("../schema/User.schema").User> & import("../schema/User.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    showFindOne(id: string): Promise<import("../schema/User.schema").User>;
    findOneUser(id: string): Promise<{
        users: import("../schema/User.schema").User;
    }>;
    findOne(id: string): Promise<import("../schema/User.schema").User>;
}

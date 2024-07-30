import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { User } from 'src/schema/User.schema';
export declare class AdminService {
    private userModel;
    constructor(userModel: Model<User>);
    addUser(req: Request, res: Response): Promise<void | {
        name: string;
        email: string;
    }>;
    showAdminDash(req: Request, res: Response): Promise<void | {
        name: string;
        email: string;
        users: number;
    }>;
    showEditProfilForm(req: Request, res: Response): Promise<void | {
        name: string;
        email: string;
        password: string;
    }>;
    editProfil(req: Request, res: Response, payload: any): Promise<void>;
    deleteProfilAdmin(req: Request, res: Response): Promise<void>;
    uploadFile(req: Request, res: Response, file: Express.Multer.File): Promise<void>;
}

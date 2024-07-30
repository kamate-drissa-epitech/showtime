import { AdminService } from './admin.service';
import { Request, Response } from 'express';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    showAdminDash(req: Request, res: Response): Promise<void | {
        name: string;
        email: string;
        users: number;
    }>;
    adduser(req: Request, res: Response): Promise<void | {
        name: string;
        email: string;
    }>;
    allUsers(req: Request, res: Response): Promise<void | {
        name: string;
        email: string;
    }>;
    showEditProfilForm(req: Request, res: Response): Promise<void | {
        name: string;
        email: string;
        password: string;
    }>;
    editProfil(req: Request, res: Response, payload: any): Promise<void>;
    deleteProfilAdmin(req: Request, res: Response): Promise<void>;
    uploadFile(res: Response, file: Express.Multer.File): Promise<Response<any, Record<string, any>>>;
}

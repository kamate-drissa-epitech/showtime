import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Req,
  Res,
  UploadedFiles,
  UploadedFile,
  UseInterceptors,
  HttpStatus,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, Multer } from 'multer';
import * as path from 'path';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}
  @Get()
  @Render('dash/admin')
  async showAdminDash(@Req() req: Request, @Res() res: Response) {
    return await this.adminService.showAdminDash(req, res);
  }

  @Get('adduser')
  @Render('dash/addUser')
  adduser(@Req() req: Request, @Res() res: Response) {
    return this.adminService.addUser(req, res);
  }

  @Get('allusers')
  @Render('dash/allUsers')
  allUsers(@Req() req: Request, @Res() res: Response) {
    return this.adminService.addUser(req, res);
  }

  @Get('editProfilForm')
  @Render('dash/editProfilForm')
  showEditProfilForm(@Req() req: Request, @Res() res: Response) {
    return this.adminService.showEditProfilForm(req, res);
  }

  @Post('editProfilForm')
  editProfil(@Req() req: Request, @Res() res: Response, @Body() payload: any) {
    return this.adminService.editProfil(req, res, payload);
  }

  @Post('deleteProfilAdmin')
  deleteProfilAdmin(@Req() req: Request, @Res() res: Response) {
    return this.adminService.deleteProfilAdmin(req, res);
  }

  @Post('uploadFile')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, callback) => {
          const fileName = path
            .parse(file.originalname)
            .name.replace(/\s/g, '');
          const extension = path.parse(file.originalname).ext;
          callback(null, `${fileName}${extension}`);
        },
      }),
    }),
  )
  async uploadFile(
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return res.status(HttpStatus.OK).json({
      success: true,
      data: file.path,
    });
  }
}

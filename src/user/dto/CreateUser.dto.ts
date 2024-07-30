import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateUserdto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  favorits: string;
}

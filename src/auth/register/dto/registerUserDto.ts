import { IsNotEmpty, IsOptional } from 'class-validator';

export class registerUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  password_confirm: string;

  @IsOptional()
  isAdmin?: string;

  @IsOptional()
  favorites?: string;
}

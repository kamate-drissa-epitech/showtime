import { PartialType } from '@nestjs/mapped-types';
import { CreateUserdto } from './CreateUser.dto';

export class UpdateUserdto extends PartialType(CreateUserdto) {}

import { Optional } from '@nestjs/common';
import {
  IsEmail,
  isEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Roles } from 'src/enums/user-role.enum';

export class UserSingUpDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsEnum(Roles)
  role: Roles = Roles.USER;
}

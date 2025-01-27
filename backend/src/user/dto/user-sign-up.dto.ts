import { Optional } from '@nestjs/common';
import {
  IsEmail,
  isEmpty,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { Roles } from 'src/enums/user-role.enum';

export class UserSingUpDto {
  @IsString()
  @Length(3, 50)
  username: string;

  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsString()
  @IsStrongPassword(
    { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1 },
    { message: 'weak password' },
  )
  password: string;

  @IsMobilePhone('ar-TN')
  phone?: string;

  @IsOptional()
  @IsEnum(Roles)
  role: Roles = Roles.USER;
}

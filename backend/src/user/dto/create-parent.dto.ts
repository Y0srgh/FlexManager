import {
  IsString,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsJSON,
  IsUUID,
  IsNumber,
  IsMobilePhone,
  IsEmail,
} from 'class-validator';
import { Assistant } from 'src/enums/assistant_type.enum';
import { Roles } from 'src/enums/user-role.enum';

export class CreateParentDto {
  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(Roles)
  role: Roles = Roles.PARENT;

  @IsMobilePhone('ar-TN', undefined, {
    message:
      'Phone number must be a valid Tunisian mobile number (e.g., +21698123456).',
  })
  phone: string;

  @IsNumber()
  @IsOptional()
  associatedAccountsCount: number = 0;

  @IsOptional()
  @IsEmail({}, { each: true })
  childrenEmails?: string[];
}

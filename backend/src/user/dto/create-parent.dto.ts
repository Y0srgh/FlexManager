import { IsString, IsOptional, IsBoolean, IsEnum, IsJSON, IsUUID, IsNumber } from 'class-validator';
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

  @IsNumber()
  associatedAccountsCount : number = 0;
}


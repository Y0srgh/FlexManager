import { IsString, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { Roles } from 'src/enums/user-role.enum';

export class CreateCoachDto {
  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(Roles)
  role: Roles = Roles.USER;

  @IsOptional()
  @IsString()
  expertise?: string;

  @IsOptional()
  @IsString()
  certifications?: string;

  @IsOptional()
  @IsBoolean()
  isPrivate?: boolean;
}

import { IsString, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { Roles } from 'src/enums/user-role.enum';
import { UserSingUpDto } from './user-sign-up.dto';

export class CreateCoachDto extends UserSingUpDto {
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

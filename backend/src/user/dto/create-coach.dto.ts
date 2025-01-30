import { IsString, IsOptional, IsBoolean } from 'class-validator';
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

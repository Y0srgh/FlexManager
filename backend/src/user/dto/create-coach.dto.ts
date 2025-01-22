import { IsString, IsOptional } from 'class-validator';

export class CreateCoachDto {
  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  expertise?: string;

  @IsOptional()
  @IsString()
  certifications?: string;
}

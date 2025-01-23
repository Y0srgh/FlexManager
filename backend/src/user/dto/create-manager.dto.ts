import { IsBoolean, IsOptional } from 'class-validator';

export class CreateManagerDto {
  @IsOptional()
  @IsBoolean()
  facilityManagementAccess?: boolean;

  @IsOptional()
  @IsBoolean()
  financialManagementAccess?: boolean;
}

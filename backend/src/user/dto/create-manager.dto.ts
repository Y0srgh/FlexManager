import { IsBoolean, IsOptional } from 'class-validator';
import { UserSingUpDto } from './user-sign-up.dto';

export class CreateManagerDto extends UserSingUpDto {
  @IsOptional()
  @IsBoolean()
  facilityManagementAccess?: boolean;

  @IsOptional()
  @IsBoolean()
  financialManagementAccess?: boolean;
}

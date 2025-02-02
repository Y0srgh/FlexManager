import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/enums/user-role.enum';

export const Role = (...roles: Roles[]) => SetMetadata('roles', roles);

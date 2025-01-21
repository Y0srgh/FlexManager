import { PartialType } from '@nestjs/mapped-types';
import { UserSingUpDto } from './user-sign-up.dto';

export class UpdateUserDto extends PartialType(UserSingUpDto) {}

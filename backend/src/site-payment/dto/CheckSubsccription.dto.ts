import { IsString } from 'class-validator';

export class CheckSubscriptionDto {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly customerId: string;
}

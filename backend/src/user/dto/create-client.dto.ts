import { IsString, IsOptional, IsBoolean, IsEnum, IsJSON, IsUUID } from 'class-validator';
import { Assistant } from 'src/enums/assistant_type.enum';
import { Roles } from 'src/enums/user-role.enum';

export class CreateClientDto {
  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(Roles)
  role: Roles = Roles.CLIENT;

  @IsOptional()
  @IsJSON()
  physicalDetails?: { weight: number; height: number ;age:number};

  // @IsOptional()
  // @IsUUID()
  // preferredCoachId?: string;

  @IsOptional()
  @IsEnum(Assistant)
  nutritionAssistanceType?: Assistant;

  // @IsOptional()
  // @IsJSON()
  // mealTracking?: { meals: string[]; calories: number };

  // @IsOptional()
  // @IsJSON()
  // progressTracking?: {
  //   caloriesBurned: number;
  //   weightLoss: number;
  //   trainingFrequency: { weekly: number; monthly: number };
  //   muscleGain: number;
  // };

  // @IsOptional()
  // @IsString()
  // subscriptionStatus?: string;

  // @IsOptional()
  // @IsJSON()
  // paymentInfo?: any;
}


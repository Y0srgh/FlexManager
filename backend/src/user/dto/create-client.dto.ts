import { IsString, IsOptional, IsBoolean, IsEnum, IsJSON, IsUUID, IsMobilePhone, IsEmail, Length, IS_STRONG_PASSWORD, IsStrongPassword } from 'class-validator';
import { Assistant } from 'src/enums/assistant_type.enum';
import { Roles } from 'src/enums/user-role.enum';

export class CreateClientDto {
  @IsString()
  @Length(3, 50)
  username: string;

  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsString()
  @IsStrongPassword( { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1}, { message: 'weak password' })
  password: string;

  @IsMobilePhone('ar-TN')
  phone?: string;

  @IsOptional()
  @IsEnum(Roles)
  role: Roles = Roles.CLIENT;

  @IsOptional()
  @IsJSON({ each: true })
  physicalDetails?: { weight: number; height: number; age:number };

  // @IsOptional()
  // @IsUUID()
  // preferredCoachId?: string;

  @IsOptional()
  @IsEnum(Assistant)
  nutritionAssistanceType?: Assistant;

  //goal
  @IsOptional()
  @IsString()
  goal?: string[];

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


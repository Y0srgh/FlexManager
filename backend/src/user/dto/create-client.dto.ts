import { IsString, IsOptional, IsBoolean, IsEnum, IsJSON, IsUUID, IsMobilePhone, IsEmail, Length, IS_STRONG_PASSWORD, IsStrongPassword, IsArray } from 'class-validator';
import { Assistant } from 'src/enums/assistant_type.enum';
import { Roles } from 'src/enums/user-role.enum';
import { UserSingUpDto } from './user-sign-up.dto';
import { Gender } from 'src/enums/gender.enum';

export class CreateClientDto extends UserSingUpDto {
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
  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  physicalDetails?: { weight: number; height: number; age:number };

  // @IsOptional()
  // @IsUUID()
  // preferredCoachId?: string;

  @IsOptional()
  @IsEnum(Assistant)
  nutritionAssistanceType?: Assistant;

  //goal
  @IsOptional()
  @IsArray()
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


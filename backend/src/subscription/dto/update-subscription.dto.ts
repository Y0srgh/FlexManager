// src/subscription/dto/update-subscription.dto.ts

import { IsString, IsNotEmpty, IsInt, IsArray } from 'class-validator';

export class UpdateSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  details: string;

  @IsInt()
  price: number;

  @IsString()
  @IsNotEmpty()
  equipment: string;

  @IsArray()
  @IsString({ each: true })
  benefits: string[];
}

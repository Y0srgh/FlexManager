import { IsOptional, IsInt, Min, Max, ValidateNested } from 'class-validator';

export class PhysicalDetailsDto {
  @IsOptional()
  @IsInt()
  @Min(10)
  @Max(300)
  weight: number;

  @IsOptional()
  @IsInt()
  @Min(100)
  @Max(250)
  height: number;

  @IsOptional()
  @IsInt()
  @Min(8)
  @Max(120)
  age: number;
}

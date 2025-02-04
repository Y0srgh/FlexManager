import { IsOptional, IsInt, Min, Max, ValidateNested } from 'class-validator';

export class PhysicalDetailsDto {
  // @IsInt()
  // @Min(8)
  // @Max(120)
  @IsOptional()
  age: number;

  // @IsInt()
  // @Min(100)
  // @Max(250)
  @IsOptional()
  height: number;

  // @IsInt()
  // @Min(10)
  // @Max(300)
  @IsOptional()
  weight: number;


}

import { IsString, IsInt, IsOptional, IsDateString } from 'class-validator';
import { time } from 'console';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsInt()
  duration: number;

  @IsOptional()
 
  startTime?: string;

  @IsOptional()

  endTime?: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsInt()
  capacity?: number;

  @IsOptional()
 
  coachId?: string;  
}

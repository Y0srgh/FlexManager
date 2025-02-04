import { IsUUID, IsDateString, IsString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateReservationDto {
  @IsDateString()
  date: string;

  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  endTime: string;
  @IsOptional()
  @IsString()
  state:string;
  @IsInt()
  @IsOptional()
  duration: number;

  @IsUUID()
  coachId: string;

  @IsUUID()
  clientId: string;
}

import { IsUUID, IsDateString, IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateReservationDto {
  @IsDateString()
  date: string;

  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  endTime: string;

  @IsInt()
  duration: number;

  @IsUUID()
  coachId: string;

  @IsUUID()
  clientId: string;
}

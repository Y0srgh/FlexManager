import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Reservation } from './entities/reservation.entity';
import { CoachEntity } from 'src/user/entities/coach.entity';
import { ClientEntity } from 'src/user/entities/client.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, CoachEntity, ClientEntity]), 
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}

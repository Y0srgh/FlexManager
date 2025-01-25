import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CoachEntity } from 'src/user/entities/coach.entity';
import { ClientEntity } from 'src/user/entities/client.entity';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @Column({ type: 'int' })
  duration: number; // in weeks

   // Relation to CoachEntity
   @ManyToOne(() => CoachEntity, (coach) => coach.reservations, { eager: true })
   coachEntity: CoachEntity;
 
   // Relation to ClientEntity
   @ManyToOne(() => ClientEntity, (client) => client.reservations, { eager: true })
   clientEntity: ClientEntity;
}

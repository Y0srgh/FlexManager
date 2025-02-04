import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
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

  @Column({ type: 'int' , nullable: true})
  duration: number; // in minutes

  @Column({ type: 'enum', enum: ['pending', 'approved', 'canceled'], default: 'pending' })
  state: string;

  // Relation to CoachEntity
  @ManyToOne(() => CoachEntity, (coach) => coach.reservations, { eager: true })
  coachEntity: CoachEntity;

  // Relation to ClientEntity
  @ManyToOne(() => ClientEntity, (client) => client.reservations, { eager: true })
  clientEntity: ClientEntity;
}

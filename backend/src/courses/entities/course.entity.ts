import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CoachEntity } from './coach.entity';

@Entity('courses') 
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  duration: number;

  @Column({ type: 'time', nullable: false })
  startTime: string; 

  @Column({ type: 'time', nullable: false })
  endTime: string;

  @Column('simple-array')
  daysOfWeek: string[]; 

  @ManyToOne(() => CoachEntity, (coach) => coach.courses, { onDelete: 'SET NULL' })
  coach: CoachEntity; 
}

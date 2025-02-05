import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CoachEntity } from 'src/user/entities/coach.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  duration: number;

  @Column({ nullable: true })
  coachPhoto: string;

  @Column({ type: 'time', nullable: true })
  startTime: string;

  @Column({ type: 'time', nullable: true })
  endTime: string;

  @Column({ type: 'date', nullable: true })
  date: string; 

  @Column({ type: 'int', nullable: true })
  capacity?: number; 

  @Column({ type: 'simple-array', nullable: true })
  daysOfWeek: string[];

  @ManyToOne(() => CoachEntity, (coach) => coach.courses, { onDelete: 'SET NULL' })
  coach: CoachEntity;
}

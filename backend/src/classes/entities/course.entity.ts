import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CoachEntity } from 'src/user/entities/coach.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  duration: number;

  @Column({ type: 'time', nullable: true })
  startTime: string;

  @Column({ type: 'time', nullable: true })
  endTime: string;

  @Column({ type: 'date', nullable: true })
  date: string; 
  @ManyToOne(() => CoachEntity, (coach) => coach.courses, { onDelete: 'SET NULL' })
  coach: CoachEntity;
}

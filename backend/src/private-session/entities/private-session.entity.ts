import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Course } from 'src/classes/entities/course.entity';
import { CoachEntity } from 'src/user/entities/coach.entity';

@Entity('private_sessions')
export class PrivateSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 }) 
  price: number;

  @ManyToOne(() => Course, (course) => course.id, { onDelete: 'CASCADE' })
  course: Course;

  @ManyToOne(() => CoachEntity, (coach) => coach.id, { onDelete: 'CASCADE' })
  coach: CoachEntity;
}

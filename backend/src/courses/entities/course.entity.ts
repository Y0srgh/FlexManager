import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('courses') // The table name will be 'courses'
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  duration: number; // Duration in weeks
}

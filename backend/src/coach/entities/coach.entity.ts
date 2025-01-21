import { Entity, Column, OneToMany } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Course } from '../../classes/entities/course.entity';

@Entity('coaches') 
export class CoachEntity extends UserEntity {
  @Column({ nullable: true })
  expertise: string; 
  @Column({ nullable: true })
  certifications: string; 
  @Column({ default: false }) 
  isPrivate: boolean;

  @OneToMany(() => Course, (course) => course.coach, { cascade: true })
  courses: Course[]; 
}

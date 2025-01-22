import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Course } from 'src/classes/entities/course.entity';

@Entity('coaches') 
export class CoachEntity extends UserEntity {
  @Column({ nullable: true })
  expertise: string; 

  @Column({ nullable: true })
  certifications: string; 

  @Column({ default: false, nullable: true }) 
  isPrivate: boolean;

  @OneToMany(() => Course, (course) => course.coach, { cascade: true, nullable: true })
  courses: Course[]; 

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'userId' }) 
  user: UserEntity;
}


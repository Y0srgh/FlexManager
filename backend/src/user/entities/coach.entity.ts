import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  PrimaryColumn,
} from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Course } from 'src/classes/entities/course.entity';
import { TimestampEntity } from 'src/Generics/timestamp.entities';

@Entity('coaches')
export class CoachEntity extends TimestampEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ nullable: true })
  expertise: string;

  @Column({ nullable: true })
  certifications: string;

  @Column({ default: false, nullable: true })
  isPrivate: boolean;

  @OneToMany(() => Course, (course) => course.coach, {
    cascade: true,
    nullable: true,
  })
  courses: Course[];

  @OneToOne(() => UserEntity, (user) => user.coach, {
    eager: true,
  })
  @JoinColumn()
  user: UserEntity;
}

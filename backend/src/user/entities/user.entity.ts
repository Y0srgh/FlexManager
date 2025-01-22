import { Roles } from 'src/enums/user-role.enum';
import { TimestampEntity } from 'src/Generics/timestamp.entities';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne
} from 'typeorm';
import { CoachEntity } from './coach.entity';

@Entity('users')
export class UserEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'enum', default: Roles.USER, enum: Roles })
  role: string; 

  @Column()
  salt: string;

  @OneToOne(() => CoachEntity, (coach) => coach.user, {
    nullable: true,
    cascade: true,
  })
  coach: CoachEntity;

}

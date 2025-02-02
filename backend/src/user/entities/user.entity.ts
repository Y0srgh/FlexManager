import { Roles } from 'src/enums/user-role.enum';
import { TimestampEntity } from 'src/Generics/timestamp.entities';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  PrimaryColumn,
  JoinColumn
} from 'typeorm';
import { CoachEntity } from './coach.entity';
import { ClientEntity } from './client.entity';
import { ManagerEntity } from './manager.entity';
import { ParentEntity } from './parents.entity';

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

  @Column({ nullable: true })
  refreshToken: string;

  @OneToOne(() => CoachEntity, (coach) => coach.user, {
    nullable: true,
    cascade: true,
  })
  coach: CoachEntity;

  @OneToOne(() => ClientEntity, (client) => client.user, {
    nullable: true,
    // cascade: true,
  })
  client: ClientEntity;

  @OneToOne(() => ManagerEntity, (manager) => manager.user, {
    nullable: true,
    cascade: true,
  })
  manager: ManagerEntity;

  @OneToOne(() => ParentEntity, (parent) => parent.user, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn()
  parent: ParentEntity;

}

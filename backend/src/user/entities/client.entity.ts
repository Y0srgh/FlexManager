import {
  Entity,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { Assistant } from 'src/enums/assistant_type.enum';
import { TimestampEntity } from 'src/Generics/timestamp.entities';
import { ParentEntity } from './parents.entity';
import { Gender } from 'src/enums/gender.enum';
import { Goal } from 'src/enums/goal.enum';
import { Reservation } from 'src/reservation/entities/reservation.entity';

@Entity('clients')
export class ClientEntity extends TimestampEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'json', nullable: true })
  physicalDetails: { weight: number; height: number; age: number };

  @ManyToOne(() => ParentEntity, (client) => client.children, {
    nullable: true,
    eager: true,
  })
  parentAccount: ParentEntity;

  @Column({ type: 'uuid', nullable: true })
  preferredCoachId: string;

  @Column({ type: 'enum', default: Gender.MALE, enum: Gender })
  gender: string;

  //goal
  @Column({ type: 'enum', array:true, enum: Goal, default: [Goal.MUSCLEGAIN] })
  goal: string[];

  @Column({ type: 'enum', default: Assistant.ONE, enum: Assistant })
  nutritionAssistanceType: string;

  @Column({ type: 'json', nullable: true })
  mealTracking: { meals: string[]; calories: number };

  @Column({ type: 'json', nullable: true })
  progressTracking: {
    caloriesBurned: number;
    weightLoss: number;
    trainingFrequency: { weekly: number; monthly: number };
    muscleGain: number;
  };

  @Column({ nullable: true })
  subscriptionStatus: string;

  @Column({ type: 'json', nullable: true })
  paymentInfo: any;

  @OneToOne(() => UserEntity, (user) => user.client, {
    eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE', cascade: true
  })
  @JoinColumn()
  user: UserEntity;
  @OneToMany(() => Reservation, (reservation) => reservation.clientEntity)
  reservations: Reservation[];
}
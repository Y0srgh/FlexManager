import { Entity, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { Assistant } from 'src/enums/assistant_type.enum';

@Entity('clients')
export class ClientEntity extends UserEntity {
  @Column({ nullable: true })
  physicalDetails: { weight: number; height: number };

  @ManyToOne(() => UserEntity, { nullable: true })
  parentAccount: UserEntity;

  @Column({ type: 'uuid', nullable: true })
  preferredCoachId: string;

  @Column({ type: 'enum', default: Assistant.ONE, enum: Assistant })
  nutritionAssistanceType: string;

  @Column({ nullable: true })
  mealTracking: { meals: string[]; calories: number };

  @Column({ nullable: true })
  progressTracking: {
    caloriesBurned: number;
    weightLoss: number;
    trainingFrequency: { weekly: number; monthly: number };
    muscleGain: number;
  };

  @Column({ nullable: true })
  subscriptionStatus: string;

  @Column({ nullable: true })
  paymentInfo: any;
}

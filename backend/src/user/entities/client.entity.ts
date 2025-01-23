import { Entity, Column, ManyToOne, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { Assistant } from 'src/enums/assistant_type.enum';
import { TimestampEntity } from 'src/Generics/timestamp.entities';
import { ParentEntity } from './parents.entity';

@Entity('clients')
export class ClientEntity extends TimestampEntity {

  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'json', nullable: true })
  physicalDetails: { weight: number; height: number };

  @ManyToOne(() => ParentEntity, (client) => client.children,{ nullable: true, eager: true })
  parentAccount: ParentEntity;

  @Column({ type: 'uuid', nullable: true })
  preferredCoachId: string;

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
    eager: true,
  })
  @JoinColumn()
  user: UserEntity;
}

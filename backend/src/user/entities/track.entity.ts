import { TimestampEntity } from 'src/Generics/timestamp.entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClientEntity } from './client.entity';

@Entity('progress_tracking')
export class TrackEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ClientEntity, (client) => client.progressHistory, {
    onDelete: 'CASCADE',
  })
  client: ClientEntity;

  @Column({ type: 'float', nullable: true })
  weight: number;

  @Column({ type: 'float', nullable: true })
  muscleRate: number;

  @Column({ type: 'float', nullable: true })
  caloriesBurned: number;

  @Column({ type: 'float', nullable: true })
  fatRate: number;
}

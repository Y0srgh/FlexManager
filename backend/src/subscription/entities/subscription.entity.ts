

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('subscriptions') 
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  details: string;

  @Column({ type: 'integer' })
  price: number;

  @Column({ type: 'varchar' })
  equipment: string;

  @Column('text', { array: true })
  benefits: string[];
}

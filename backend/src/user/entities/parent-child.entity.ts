import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ParentEntity } from './parents.entity';
import { ClientEntity } from './client.entity';

@Entity('parent_child_requests')
export class ParentChildRequestEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ParentEntity, (parent) => parent.childRequests, { eager: true })
  parent: ParentEntity;

  @ManyToOne(() => ClientEntity, { eager: true })
  child: ClientEntity;

  @Column({ type: 'enum', enum: ['pending', 'approved', 'rejected'], default: 'pending' })
  status: 'pending' | 'approved' | 'rejected';
}

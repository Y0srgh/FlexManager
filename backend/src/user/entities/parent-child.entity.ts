import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ParentEntity } from './parents.entity';
import { ClientEntity } from './client.entity';

@Entity('parent_child_requests')
export class ParentChildEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ParentEntity, (parent) => parent.children, { eager: true })
  parent: ParentEntity;

  @ManyToOne(() => ClientEntity, { eager: true })
  child: ClientEntity;

  @Column({ default: 'pending' })
  status: 'pending' | 'approved' | 'rejected';
}

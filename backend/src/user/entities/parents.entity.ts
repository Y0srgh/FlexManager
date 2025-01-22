import { Entity, Column, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { ClientEntity } from './client.entity';

@Entity('parents')
export class ParentEntity extends UserEntity {
  @OneToMany(() => ClientEntity, (client) => client.parentAccount)
  children: ClientEntity[];

  @Column({ type: 'json', nullable: true })
  childActivityTracking: {
    attendedClasses: { className: string; date: Date }[];
  };

  @Column({ type: 'json', nullable: true })
  childPaymentStatus: { childId: string; status: string }[];
}

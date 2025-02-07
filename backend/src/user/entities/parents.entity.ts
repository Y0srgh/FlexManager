import {
  Entity,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ClientEntity } from './client.entity';
import { TimestampEntity } from 'src/Generics/timestamp.entities';
import { ParentChildRequestEntity } from './parent-child.entity';

@Entity('parents')
export class ParentEntity extends TimestampEntity {
  @PrimaryColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity, (user) => user.parent, {
    eager: true,
    onDelete: 'CASCADE', onUpdate: 'CASCADE', 
    cascade: true
  })
  user: UserEntity;
  
  // @OneToMany(() => ClientEntity, (client) => client.parentAccount)
  // children: ClientEntity[];

  @OneToMany(() => ParentChildRequestEntity, (request) => request.parent)
  childRequests: ParentChildRequestEntity[];

  @Column({ default: 0 })
  associatedAccountsCount: number;

  //   @Column({ type: 'json', nullable: true })
  //   childActivityTracking: {
  //     attendedClasses: { className: string; date: Date }[];
  //   };

  //   @Column({ type: 'json', nullable: true })
  //   childPaymentStatus: { childId: string; status: string }[];
}

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

@Entity('parents')
export class ParentEntity extends TimestampEntity {
  @PrimaryColumn('uuid')
  id: string;

  @OneToMany(() => ClientEntity, (client) => client.parentAccount)
  children: ClientEntity[];

  @OneToOne(() => UserEntity, (user) => user.parent, {
    eager: true,
  })
  @JoinColumn()
  user: UserEntity;

  //column that count the number of associated accounts
  @Column({ default: 0 })
  associatedAccountsCount: number;

  //   @Column({ type: 'json', nullable: true })
  //   childActivityTracking: {
  //     attendedClasses: { className: string; date: Date }[];
  //   };

  //   @Column({ type: 'json', nullable: true })
  //   childPaymentStatus: { childId: string; status: string }[];
}

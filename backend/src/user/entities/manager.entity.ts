import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { TimestampEntity } from 'src/Generics/timestamp.entities';

@Entity('managers')
export class ManagerEntity extends TimestampEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ default: true })
  facilityManagementAccess: boolean;

  @Column({ default: true })
  financialManagementAccess: boolean;

  @OneToOne(() => UserEntity, (user) => user.manager, {
    eager: true,onDelete: 'CASCADE', onUpdate: 'CASCADE', cascade: true,
  })
  @JoinColumn()
  user: UserEntity;
}

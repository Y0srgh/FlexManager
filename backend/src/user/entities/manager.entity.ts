import { Entity, Column } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('managers')
export class ManagerEntity extends UserEntity {
  // @Column({ nullable: true })
  // dashboardAccess: {
  //   revenueStats: any;
  //   courseStats: any;
  //   facilityStats: any;
  //   trainerStats: any;
  //   sportStats: any;
  // };


  //to be deleted when the new schema is implemented
  // @Column({ nullable: true })
  // equipmentInventory: { item: string; quantity: number }[];

  @Column({ default: true })
  facilityManagementAccess: boolean;

  @Column({ default: true })
  financialManagementAccess: boolean;

  // @Column({type:'', nullable: true })
  // advertisingCampaigns: any[];
}

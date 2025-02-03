import { User } from 'src/messenger/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn ,OneToOne, JoinColumn } from 'typeorm';

@Entity('siteSubscriptions')
export class siteSubscriptions {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({default : ""})
  stripeCustomerId: string;

  @Column({default : ""})
  stripeSubscriptionId: string;

  @Column()
  priceId: string;
  @Column({default : "FREETRIAL"})
  Plan: string;

  @Column({ default: false })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(()=> User,(user) => user.siteSubscription)
  user : User;

  @UpdateDateColumn()
  updatedAt: Date;
  getDaysSinceSubscription(): number {
    const today = new Date();
    const diffTime = today.getTime() - this.updatedAt.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }
  CheckSubscription(): void{
    if (this.getDaysSinceSubscription() >=30){
      this.Plan="FREETRIAL"
      this.isActive=false
    }
  }

}

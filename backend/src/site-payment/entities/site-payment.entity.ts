import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('siteSubscriptions')
export class siteSubscriptions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  stripeCustomerId: string;

  @Column()
  stripeSubscriptionId: string;

  @Column()
  priceId: string;
  @Column()
  Plan: string;

  @Column({ default: false })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

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
